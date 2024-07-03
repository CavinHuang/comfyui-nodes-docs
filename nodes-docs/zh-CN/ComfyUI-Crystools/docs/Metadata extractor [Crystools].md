
# Documentation
- Class name: Metadata extractor [Crystools]
- Category: crystools 🪛/Metadata
- Output node: False

Metadata Extractor节点旨在处理和转换原始元数据，使其成为结构化且更易理解的格式。它专注于从各种来源提取、验证和格式化元数据，确保数据准备就绪，可用于进一步分析或处理。

# Input types
## Required
- metadata_raw
    - 该节点将处理的原始元数据输入。这个参数至关重要，因为它作为提取和转换操作的主要数据源。
    - Comfy dtype: METADATA_RAW
    - Python dtype: Optional[Dict[str, Any]]

# Output types
- prompt
    - 从原始元数据中提取的'prompt'信息，提供用户初始输入或命令的洞察。
    - Comfy dtype: JSON
    - Python dtype: str
- workflow
    - 从原始元数据中提取的'workflow'信息，概述操作或任务的序列。
    - Comfy dtype: JSON
    - Python dtype: str
- file info
    - 从原始元数据中提取的'file info'，详细说明相关文件的特征或属性。
    - Comfy dtype: JSON
    - Python dtype: str
- raw to JSON
    - 将原始元数据转换为结构化JSON格式的版本。
    - Comfy dtype: JSON
    - Python dtype: str
- raw to property
    - 原始元数据的属性式表示，便于更容易地访问和操作。
    - Comfy dtype: STRING
    - Python dtype: str
- raw to csv
    - 原始元数据的CSV表示，实现与电子表格应用程序和数据分析工具的兼容性。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CMetadataExtractor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "metadata_raw": METADATA_RAW,
            },
            "optional": {
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.METADATA.value
    RETURN_TYPES = ("JSON", "JSON", "JSON", "JSON", "STRING", "STRING")
    RETURN_NAMES = ("prompt", "workflow", "file info", "raw to JSON", "raw to property", "raw to csv")
    # OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, metadata_raw=None):
        prompt = {}
        workflow = {}
        fileinfo = {}
        text = ""
        csv = ""

        if metadata_raw is not None and isinstance(metadata_raw, dict):
            try:
                for key, value in metadata_raw.items():

                    if isinstance(value, dict):
                        # yes, double json.dumps is needed for jsons
                        value = json.dumps(json.dumps(value))
                    else:
                        value = json.dumps(value)

                    text += f"\"{key}\"={value}\n"
                    # remove spaces
                    # value = re.sub(' +', ' ', value)
                    value = re.sub('\n', ' ', value)
                    csv += f'"{key}"\t{value}\n'

                if csv != "":
                    csv = '"key"\t"value"\n' + csv

            except Exception as e:
                logger.warn(e)

            try:
                if "prompt" in metadata_raw:
                    prompt = metadata_raw["prompt"]
                else:
                    raise Exception("Prompt not found in metadata_raw")
            except Exception as e:
                logger.warn(e)

            try:
                if "workflow" in metadata_raw:
                    workflow = metadata_raw["workflow"]
                else:
                    raise Exception("Workflow not found in metadata_raw")
            except Exception as e:
                logger.warn(e)

            try:
                if "fileinfo" in metadata_raw:
                    fileinfo = metadata_raw["fileinfo"]
                else:
                    raise Exception("Fileinfo not found in metadata_raw")
            except Exception as e:
                logger.warn(e)

        elif metadata_raw is None:
            logger.debug("metadata_raw is None")
        else:
            logger.warn(TEXTS.INVALID_METADATA_MSG.value)

        return (json.dumps(prompt, indent=CONFIG["indent"]),
                json.dumps(workflow, indent=CONFIG["indent"]),
                json.dumps(fileinfo, indent=CONFIG["indent"]),
                json.dumps(metadata_raw, indent=CONFIG["indent"]),
                text, csv)

```
