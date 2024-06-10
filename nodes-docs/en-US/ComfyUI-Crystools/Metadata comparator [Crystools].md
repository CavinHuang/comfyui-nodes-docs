---
tags:
- Comparison
---

# 🪛 Metadata comparator
## Documentation
- Class name: `Metadata comparator [Crystools]`
- Category: `crystools 🪛/Metadata`
- Output node: `True`

The CMetadataCompare node is designed to compare two sets of metadata, identifying differences and similarities between them. It abstracts the complexity of metadata comparison, providing insights into how metadata has evolved over time.
## Input types
### Required
- **`metadata_raw_old`**
    - The older set of metadata to be compared. It serves as the baseline for comparison, influencing the identification of changes.
    - Comfy dtype: `METADATA_RAW`
    - Python dtype: `dict`
- **`metadata_raw_new`**
    - The newer set of metadata to be compared against the older set. It plays a crucial role in highlighting updates or modifications.
    - Comfy dtype: `METADATA_RAW`
    - Python dtype: `dict`
- **`what`**
    - Specifies the type of comparison to perform, affecting the node's execution and the nature of the comparison results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
## Output types
- **`diff`**
    - Comfy dtype: `JSON`
    - The result of the comparison, detailing the differences and similarities between the two sets of metadata.
    - Python dtype: `str`
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
