
# Documentation
- Class name: Metadata comparator [Crystools]
- Category: crystools 🪛/Metadata
- Output node: True
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

CMetadataCompare节点旨在比较两组元数据，以识别其中的差异和相似之处。它抽象了元数据比较的复杂性，提供了元数据随时间演变的洞察。

# Input types
## Required
- metadata_raw_old
    - 要比较的旧元数据集。它作为比较的基准线，影响变化的识别。
    - Comfy dtype: METADATA_RAW
    - Python dtype: dict
- metadata_raw_new
    - 要与旧元数据集进行比较的新元数据集。它在突出更新或修改方面起着至关重要的作用。
    - Comfy dtype: METADATA_RAW
    - Python dtype: dict
- what
    - 指定要执行的比较类型，影响节点的执行和比较结果的性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional

# Output types
- diff
    - 比较的结果，详细说明了两组元数据之间的差异和相似之处。
    - Comfy dtype: JSON
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CMetadataCompare:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "metadata_raw_old": METADATA_RAW,
                "metadata_raw_new": METADATA_RAW,
                "what": (["Prompt", "Workflow", "Fileinfo"],),
            },
            "optional": {
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.METADATA.value
    RETURN_TYPES = ("JSON",)
    RETURN_NAMES = ("diff",)
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, what, metadata_raw_old=None, metadata_raw_new=None):
        prompt_old = {}
        workflow_old = {}
        fileinfo_old = {}
        prompt_new = {}
        workflow_new = {}
        fileinfo_new = {}
        diff = ""

        if type(metadata_raw_old) == dict and type(metadata_raw_new) == dict:

            if "prompt" in metadata_raw_old:
                prompt_old = metadata_raw_old["prompt"]
            else:
                logger.warn("Prompt not found in metadata_raw_old")

            if "workflow" in metadata_raw_old:
                workflow_old = metadata_raw_old["workflow"]
            else:
                logger.warn("Workflow not found in metadata_raw_old")

            if "fileinfo" in metadata_raw_old:
                fileinfo_old = metadata_raw_old["fileinfo"]
            else:
                logger.warn("Fileinfo not found in metadata_raw_old")

            if "prompt" in metadata_raw_new:
                prompt_new = metadata_raw_new["prompt"]
            else:
                logger.warn("Prompt not found in metadata_raw_new")

            if "workflow" in metadata_raw_new:
                workflow_new = metadata_raw_new["workflow"]
            else:
                logger.warn("Workflow not found in metadata_raw_new")

            if "fileinfo" in metadata_raw_new:
                fileinfo_new = metadata_raw_new["fileinfo"]
            else:
                logger.warn("Fileinfo not found in metadata_raw_new")

            if what == "Prompt":
                diff = findJsonsDiff(prompt_old, prompt_new)
            elif what == "Workflow":
                diff = findJsonsDiff(workflow_old, workflow_new)
            else:
                diff = findJsonsDiff(fileinfo_old, fileinfo_new)

            diff = json.dumps(diff, indent=CONFIG["indent"])

        else:
            invalid_msg = TEXTS.INVALID_METADATA_MSG.value
            logger.warn(invalid_msg)
            diff = invalid_msg

        return {"ui": {"text": [diff]}, "result": (diff,)}

```
