from fastapi import Header


def get_current_user(
    authorization: str = Header(
        default=None
    ),
):
    return {
        "received": authorization
    }