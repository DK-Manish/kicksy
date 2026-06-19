#!/bin/bash
# Sets Type and Area custom fields on all 142 Kicksy Roadmap project items
set -e

echo "[1/142] Setting fields..."
gh project item-edit --id "PVTI_lAHOB9R9us4BbIIwzgwRORU" --project-id "PVT_kwHOB9R9us4BbIIw" --field-id "PVTSSF_lAHOB9R9us4BbIIwzhV7qYQ" --single-select-option-id "685b3a69"
gh project item-edit --id "PVTI_lAHOB9R9us4BbIIwzgwRORU" --project-id "PVT_kwHOB9R9us4BbIIw" --field-id "PVTSSF_lAHOB9R9us4BbIIwzhV7qZ8" --single-select-option-id "695c46db"
