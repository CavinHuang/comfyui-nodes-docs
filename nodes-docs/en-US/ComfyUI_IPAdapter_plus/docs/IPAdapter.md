---
tags:
- IPAdapter
---

# IPAdapter
## Documentation
- Class name: `IPAdapter`
- Category: `ipadapter`
- Output node: `False`

The IPAdapter node serves as a modular component designed to adapt and apply various image processing techniques to models within the ComfyUI framework. It enables the customization and enhancement of image generation processes through a diverse set of parameters and methods, facilitating a wide range of artistic and technical manipulations.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model to which the IPAdapter will apply its image processing techniques, serving as the foundation for the adaptations and enhancements performed by the node.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - This parameter specifies the particular IPAdapter configuration or method to be applied, dictating the specific image processing techniques and customizations that will be executed on the model.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
- **`image`**
    - The image parameter is the input image to be processed or manipulated by the IPAdapter, serving as the primary subject for the node's image processing techniques.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`weight`**
    - Specifies the weight of the adaptation effect, allowing for fine-tuning of the intensity of the applied image processing techniques.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - Defines the starting point of the effect application in a process, enabling phased or gradual application of image processing techniques.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Determines the endpoint of the effect application, allowing for precise control over how the image processing techniques conclude.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Indicates the type of weighting method to be used, affecting how the adaptation effect is applied over the process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`attn_mask`**
    - An optional parameter that provides an attention mask to focus or exclude specific areas from the image processing effects.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model after applying the specified IPAdapter techniques and parameters, showcasing the adaptations and enhancements.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [unCLIPConditioning](../../Comfy/Nodes/unCLIPConditioning.md)
    - [FreeU](../../Comfy/Nodes/FreeU.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)



## Source code
```python
class IPAdapterSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL", ),
                "ipadapter": ("IPADAPTER", ),
                "image": ("IMAGE",),
                "weight": ("FLOAT", { "default": 1.0, "min": -1, "max": 3, "step": 0.05 }),
                "start_at": ("FLOAT", { "default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "end_at": ("FLOAT", { "default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001 }),
                "weight_type": (['standard', 'prompt is more important', 'style transfer'], ),
            },
            "optional": {
                "attn_mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply_ipadapter"
    CATEGORY = "ipadapter"

    def apply_ipadapter(self, model, ipadapter, image, weight, start_at, end_at, weight_type, attn_mask=None):
        if weight_type.startswith("style"):
            weight_type = "style transfer"
        elif weight_type == "prompt is more important":
            weight_type = "ease out"
        else:
            weight_type = "linear"

        ipa_args = {
            "image": image,
            "weight": weight,
            "start_at": start_at,
            "end_at": end_at,
            "attn_mask": attn_mask,
            "weight_type": weight_type,
            "insightface": ipadapter['insightface']['model'] if 'insightface' in ipadapter else None,
        }

        if 'ipadapter' not in ipadapter:
            raise Exception("IPAdapter model not present in the pipeline. Please load the models with the IPAdapterUnifiedLoader node.")
        if 'clipvision' not in ipadapter:
            raise Exception("CLIPVision model not present in the pipeline. Please load the models with the IPAdapterUnifiedLoader node.")

        return ipadapter_execute(model.clone(), ipadapter['ipadapter']['model'], ipadapter['clipvision']['model'], **ipa_args)

```
