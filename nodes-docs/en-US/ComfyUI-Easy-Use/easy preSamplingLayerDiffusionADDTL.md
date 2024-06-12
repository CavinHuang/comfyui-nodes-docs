---
tags:
- LayeredDiffusion
---

# PreSampling (LayerDiffuse ADDTL)
## Documentation
- Class name: `easy preSamplingLayerDiffusionADDTL`
- Category: `EasyUse/PreSampling`
- Output node: `True`

This node is designed to apply layer diffusion techniques to pre-sample layers in a generative model, enhancing the quality and detail of generated images. It integrates advanced diffusion methods to manipulate layers based on specified methods, weights, and steps, allowing for fine-tuned control over the diffusion process.
## Input types
### Required
- **`pipe`**
    - unknown
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `unknown`
- **`foreground_prompt`**
    - The foreground prompt specifies additional textual input that influences the generative process, particularly focusing on the foreground elements of the image. It plays a crucial role in guiding the diffusion process to achieve desired visual outcomes in the foreground.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`background_prompt`**
    - The background prompt provides textual input that targets the background elements of the image during the generative process. This parameter is essential for directing the diffusion effects specifically to the background, enabling more controlled and nuanced image generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`blended_prompt`**
    - The blended prompt is used to specify textual input that affects the blending of foreground and background elements in the image. It is key to achieving a harmonious integration of elements through the diffusion process, impacting the overall aesthetic and coherence of the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`optional_fg_cond`**
    - This optional parameter allows for the specification of additional conditions or modifiers for the foreground, providing a means to further customize and refine the foreground elements during the diffusion process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[str]`
- **`optional_bg_cond`**
    - Similar to the optional foreground condition, this parameter enables the specification of additional conditions or modifiers for the background, offering enhanced control over the background's appearance and integration with the foreground.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[str]`
- **`optional_blended_cond`**
    - This parameter allows for the introduction of conditions or modifiers that specifically affect the blending of foreground and background elements. It is instrumental in fine-tuning the visual outcome of the blended areas, ensuring a seamless and aesthetically pleasing integration.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[str]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the modified pipeline configuration after applying the layer diffusion, reflecting changes made to the generative model's layers.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class layerDiffusionSettingsADDTL:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
            {
                "pipe": ("PIPE_LINE",),
                "foreground_prompt": ("STRING", {"default": "", "placeholder": "Foreground Additional Prompt", "multiline": True}),
                "background_prompt": ("STRING", {"default": "", "placeholder": "Background Additional Prompt", "multiline": True}),
                "blended_prompt": ("STRING", {"default": "", "placeholder": "Blended Additional Prompt", "multiline": True}),
            },
            "optional": {
                "optional_fg_cond": ("CONDITIONING",),
                "optional_bg_cond": ("CONDITIONING",),
                "optional_blended_cond": ("CONDITIONING",),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def settings(self, pipe, foreground_prompt, background_prompt, blended_prompt, optional_fg_cond=None, optional_bg_cond=None, optional_blended_cond=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        fg_cond, bg_cond, blended_cond = None, None, None
        clip = pipe['clip']
        if optional_fg_cond is not None:
            fg_cond = optional_fg_cond
        elif foreground_prompt != "":
            fg_cond, = CLIPTextEncode().encode(clip, foreground_prompt)
        if optional_bg_cond is not None:
            bg_cond = optional_bg_cond
        elif background_prompt != "":
            bg_cond, = CLIPTextEncode().encode(clip, background_prompt)
        if optional_blended_cond is not None:
            blended_cond = optional_blended_cond
        elif blended_prompt != "":
            blended_cond, = CLIPTextEncode().encode(clip, blended_prompt)

        new_pipe = {
            **pipe,
            "loader_settings": {
                **pipe["loader_settings"],
                "layer_diffusion_cond": (fg_cond, bg_cond, blended_cond)
            }
        }

        del pipe

        return (new_pipe,)

```
