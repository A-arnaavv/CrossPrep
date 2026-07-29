from functools import lru_cache

import jwt

from fastapi import HTTPException

from jwt import PyJWKClient
from jwt.exceptions import (
    ExpiredSignatureError,
    InvalidTokenError,
)

from app.core.config import settings


def get_clerk_issuer_url() -> str:
    issuer_url = (
        settings.CLERK_ISSUER_URL
        .strip()
        .rstrip("/")
    )

    if not issuer_url:
        raise RuntimeError(
            "CLERK_ISSUER_URL is not configured."
        )

    return issuer_url


def get_authorized_parties() -> set[str]:
    configured_value = (
        settings.CLERK_AUTHORIZED_PARTIES
        .strip()
    )

    return {
        value.strip().rstrip("/")
        for value in configured_value.split(",")
        if value.strip()
    }


@lru_cache(maxsize=1)
def get_jwks_client() -> PyJWKClient:
    issuer_url = get_clerk_issuer_url()

    jwks_url = (
        f"{issuer_url}/.well-known/jwks.json"
    )

    return PyJWKClient(
        jwks_url,
        cache_keys=True,
    )


def verify_clerk_token(
    token: str,
) -> dict:
    issuer_url = get_clerk_issuer_url()

    try:
        signing_key = (
            get_jwks_client()
            .get_signing_key_from_jwt(token)
        )

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=issuer_url,
            options={
                "verify_aud": False,
                "require": [
                    "exp",
                    "iat",
                    "sub",
                ],
            },
        )

        authorized_parties = (
            get_authorized_parties()
        )

        token_authorized_party = (
            str(payload.get("azp", ""))
            .strip()
            .rstrip("/")
        )

        if (
            authorized_parties
            and token_authorized_party
            not in authorized_parties
        ):
            raise HTTPException(
                status_code=401,
                detail=(
                    "Token was issued for an "
                    "unauthorized application."
                ),
                headers={
                    "WWW-Authenticate": "Bearer",
                },
            )

        clerk_user_id = payload.get("sub")

        if not clerk_user_id:
            raise HTTPException(
                status_code=401,
                detail=(
                    "Authenticated user ID "
                    "is missing from token."
                ),
                headers={
                    "WWW-Authenticate": "Bearer",
                },
            )

        return payload

    except HTTPException:
        raise

    except ExpiredSignatureError as error:
        raise HTTPException(
            status_code=401,
            detail=(
                "Authentication token has expired."
            ),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        ) from error

    except InvalidTokenError as error:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token.",
            headers={
                "WWW-Authenticate": "Bearer",
            },
        ) from error

    except Exception as error:
        print(
            "Clerk token verification failed:",
            error,
        )

        raise HTTPException(
            status_code=401,
            detail=(
                "Authentication token could "
                "not be verified."
            ),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        ) from error