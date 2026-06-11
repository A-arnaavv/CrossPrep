"""add_resume_analysis_fields

Revision ID: adc6ba2d24b0
Revises: bfe001ce3c12
Create Date: 2026-06-11 09:53:02.098193

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "adc6ba2d24b0"
down_revision: Union[str, Sequence[str], None] = "bfe001ce3c12"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "resumes",
        sa.Column(
            "projects",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default="[]",
        ),
    )

    op.add_column(
        "resumes",
        sa.Column(
            "experience",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default="[]",
        ),
    )

    op.add_column(
        "resumes",
        sa.Column(
            "education",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default="[]",
        ),
    )


def downgrade() -> None:
    op.drop_column("resumes", "education")
    op.drop_column("resumes", "experience")
    op.drop_column("resumes", "projects")