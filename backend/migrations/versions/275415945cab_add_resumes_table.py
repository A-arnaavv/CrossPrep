"""add_resumes_table

Revision ID: 275415945cab
Revises: 36feae3ed047
Create Date: 2026-06-10 18:46:16.683145

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '275415945cab'
down_revision: Union[str, Sequence[str], None] = '36feae3ed047'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'resumes',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('user_id', sa.Uuid(), nullable=False),
        sa.Column('file_url', sa.String(), nullable=False),
        sa.Column('parsed_text', sa.Text(), nullable=False),
        sa.Column(
            'skills',
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False
        ),
        sa.Column('uploaded_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ['user_id'],
            ['users.id']
        ),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('resumes')
