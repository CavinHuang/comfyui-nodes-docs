# Show Text 🐍
## Documentation
- Class name: ShowText|pysssss
- Category: utils
- Output node: True
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

ShowText节点用于在工作流程中显示文本，允许基于输入文本动态更新UI元素。如果提供了特定的元数据，它还可以修改工作流程中的小部件值，从而增强交互功能。

## Input types
### Required
- text
    - 要显示或处理的主要文本。此输入对于节点的操作至关重要，作为显示或进一步操作的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str

## Output types
- string
    - Comfy dtype: STRING
    - unknown
    - Python dtype: unknown
- ui
    - 要显示的文本的UI表示，以适合UI渲染的格式封装文本。

## Usage tips
- Infra type: CPU
<!-- - Common nodes:
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [CR Image Output](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Output.md)
    - [SavePromptToFile](../../OneButtonPrompt/Nodes/SavePromptToFile.md) -->

## Source code
```python
class ShowText:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"forceInput": True}),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    INPUT_IS_LIST = True
    RETURN_TYPES = ("STRING",)
    FUNCTION = "notify"
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (True,)

    CATEGORY = "utils"

    def notify(self, text, unique_id=None, extra_pnginfo=None):
        if unique_id is not None and extra_pnginfo is not None:
            if not isinstance(extra_pnginfo, list):
                print("Error: extra_pnginfo is not a list")
            elif (
                not isinstance(extra_pnginfo[0], dict)
                or "workflow" not in extra_pnginfo[0]
            ):
                print("Error: extra_pnginfo[0] is not a dict or missing 'workflow' key")
            else:
                workflow = extra_pnginfo[0]["workflow"]
                node = next(
                    (x for x in workflow["nodes"] if str(x["id"]) == str(unique_id[0])),
                    None,
                )
                if node:
                    node["widgets_values"] = [text]

        return {"ui": {"text": text}, "result": (text,)}