---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# Text to Conditioning
## Documentation
- Class name: `Text to Conditioning`
- Category: `WAS Suite/Text/Operations`
- Output node: `False`

The 'Text to Conditioning' node is designed to convert textual input into a conditioning format suitable for further processing or generation tasks. It leverages an encoding mechanism to transform the input text and associated CLIP model information into a structured conditioning output.
## Input types
### Required
- **`clip`**
    - The 'clip' parameter represents the CLIP model information required for encoding the text. It plays a crucial role in the text-to-conditioning conversion process, influencing the encoding outcome.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`text`**
    - The 'text' parameter is the textual input that needs to be converted into a conditioning format. Its content directly affects the resulting conditioning output, making it a key component of the node's functionality.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioning format derived from the encoded text and CLIP model information, ready for use in subsequent processing or generation tasks.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - [ToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ToBasicPipe.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [Prompts Everywhere](../../cg-use-everywhere/Nodes/Prompts Everywhere.md)



## Source code
```python
class WAS_Text_to_Conditioning:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip": ("CLIP",),
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "text_to_conditioning"

    CATEGORY = "WAS Suite/Text/Operations"

    def text_to_conditioning(self, clip, text):
        encoder = nodes.CLIPTextEncode()
        encoded = encoder.encode(clip=clip, text=text)
        return (encoded[0], { "ui": { "string": text } })

```
