---
tags:
- Text
---

# Show Text 🐍
## Documentation
- Class name: `ShowText|pysssss`
- Category: `utils`
- Output node: `True`

The ShowText node is designed to display text within a workflow, allowing for dynamic updates to UI elements based on input text. It can also modify widget values within the workflow if provided with specific metadata, enhancing interactive capabilities.
## Input types
### Required
- **`text`**
    - The primary text to be displayed or processed. This input is essential for the node's operation, serving as the main content for display or further action.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - The UI representation of the text to be displayed, encapsulating the text in a format suitable for UI rendering.
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [CR Image Output](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Output.md)
    - [SavePromptToFile](../../OneButtonPrompt/Nodes/SavePromptToFile.md)



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

```
