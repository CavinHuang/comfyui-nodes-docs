---
tags:
- Audio
---

# Salt Workflow Info
## Documentation
- Class name: `SaltInfo`
- Category: `SALT/IO`
- Output node: `True`

The SaltInfo node is designed to capture and display basic information about a workflow, including its title and description. It serves as a means to log and return these details for further processing or user reference.
## Input types
### Required
- **`workflow_title`**
    - The title of the workflow. It is a required input that identifies the workflow and is used for logging and display purposes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`workflow_description`**
    - The description of the workflow. It is a required input that provides additional details about the workflow's purpose and is used for logging and display purposes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`title`**
    - Comfy dtype: `STRING`
    - The title of the workflow as provided in the input.
    - Python dtype: `str`
- **`description`**
    - Comfy dtype: `STRING`
    - The description of the workflow as provided in the input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltInfo:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "workflow_title": ("STRING", {}),
                "workflow_description": ("STRING", {}),
            },
            "hidden": {"unique_id": "UNIQUE_ID"},
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("title", "description")

    FUNCTION = "info"
    CATEGORY = "SALT/IO"

    def info(self, workflow_title, workflow_description, unique_id=0):

        print(f"[SaltInfo_{unique_id}] Workflow Info:")
        print(f"Title: {workflow_title}")
        print(f"Description: {workflow_description}")

        return (workflow_title, workflow_description)

```
