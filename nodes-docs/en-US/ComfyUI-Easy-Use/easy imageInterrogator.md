---
tags:
- Prompt
---

# Image To Prompt
## Documentation
- Class name: `easy imageInterrogator`
- Category: `EasyUse/Image`
- Output node: `True`

The `easy imageInterrogator` node is designed to generate descriptive prompts based on input images, utilizing different modes to adjust the interrogation process according to the desired level of detail or speed. This functionality aids in creating textual representations of visual content, which can be used for further image generation or analysis tasks.
## Input types
### Required
- **`image`**
    - The `image` parameter is the visual content that the node will analyze to generate a descriptive prompt. It is central to the node's operation, as the output depends on the interpretation of this image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - The `mode` parameter allows users to specify the interrogation process's detail level or speed, offering options like 'fast', 'classic', 'best', and 'negative'. This choice influences the prompt's quality and generation time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_lowvram`**
    - The `use_lowvram` parameter enables the node to operate in a low VRAM mode, optimizing resource usage for systems with limited graphics memory. This can affect the interrogation process's efficiency and results.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`prompt`**
    - Comfy dtype: `STRING`
    - The output `prompt` is a textual description generated from the input image, reflecting the visual content's interpretation through the specified interrogation mode.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class imageInterrogator:
    @classmethod
    def INPUT_TYPES(self):
        return {
          "required": {
              "image": ("IMAGE",),
              "mode": (['fast','classic','best','negative'],),
              "use_lowvram": ("BOOLEAN", {"default": True}),
          }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "interrogate"
    CATEGORY = "EasyUse/Image"
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (True,)

    def interrogate(self, image, mode, use_lowvram=False):
      prompt = ci.image_to_prompt(image, mode, low_vram=use_lowvram)
      return {"ui":{"text":prompt},"result":(prompt,)}

```
