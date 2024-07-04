
# Documentation
- Class name: SaltInfo
- Category: SALT/IO
- Output node: True

SaltInfo节点旨在捕获并显示工作流的基本信息，包括其标题和描述。它作为一种记录和返回这些详细信息的手段，以供进一步处理或用户参考。

# Input types
## Required
- workflow_title
    - 工作流的标题。这是一个必需的输入，用于标识工作流，并用于日志记录和显示目的。
    - Comfy dtype: STRING
    - Python dtype: str
- workflow_description
    - 工作流的描述。这是一个必需的输入，提供有关工作流目的的额外详细信息，用于日志记录和显示目的。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- title
    - 输入中提供的工作流标题。
    - Comfy dtype: STRING
    - Python dtype: str
- description
    - 输入中提供的工作流描述。
    - Comfy dtype: STRING
    - Python dtype: str


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
