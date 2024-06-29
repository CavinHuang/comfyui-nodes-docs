---
tags:
- IPAdapter
---

# IP Adapter Pipeline
## Documentation
- Class name: `AV_IPAdapter`
- Category: `Art Venture/IP Adapter`
- Output node: `False`

The AV_IPAdapter node is designed to integrate and apply IP Adapter models to images within the Art Venture framework. It facilitates the enhancement or alteration of images by leveraging IP Adapter and CLIP vision models, allowing for the customization of visual content based on specified parameters and options.
## Input types
### Required
- **`ip_adapter_name`**
    - Specifies the name of the IP Adapter model to be used. This parameter is crucial for selecting the appropriate model for image processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_name`**
    - Determines the CLIP vision model to be utilized alongside the IP Adapter model. This parameter is essential for the combined application of both models to the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model`**
    - The initial model state before applying the IP Adapter. This parameter represents the starting point for the adaptation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`image`**
    - The image to which the IP Adapter and CLIP vision models will be applied. This parameter is central to the node's functionality, serving as the input for the adaptation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `object`
- **`weight`**
    - Controls the influence of the IP Adapter on the image. This parameter adjusts the strength of the adaptation effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise`**
    - Adjusts the level of noise introduced during the adaptation process. This parameter can be used to fine-tune the visual output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`ip_adapter_opt`**
    - Optional configurations for the IP Adapter model. This parameter allows for further customization of the adaptation process.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `dict`
- **`clip_vision_opt`**
    - Optional configurations for the CLIP vision model. This parameter enables additional adjustments to how the CLIP model is applied.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `dict`
- **`attn_mask`**
    - An optional mask that can be applied during the adaptation process, allowing for targeted modifications.
    - Comfy dtype: `MASK`
    - Python dtype: `object`
- **`start_at`**
    - Defines the starting point of the effect applied by the IP Adapter, enabling phased integration over the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_at`**
    - Specifies the end point of the IP Adapter's effect, allowing for a gradual cessation of the adaptation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`weight_type`**
    - Determines the type of weighting applied to the adaptation effect, offering options for standard, prompt importance, or style transfer.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`enabled`**
    - Toggles the application of the IP Adapter and CLIP vision models. When set to false, the adaptation process is bypassed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after applying the IP Adapter, reflecting the modifications made to the image.
    - Python dtype: `object`
- **`pipeline`**
    - Comfy dtype: `IPADAPTER`
    - A dictionary containing the IP Adapter and CLIP vision models used in the adaptation process. This output provides insight into the models' configurations.
    - Python dtype: `dict`
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - The specific CLIP vision model applied during the adaptation process. This output highlights the role of CLIP vision in the image's transformation.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)



## Source code
```python
    class AV_IPAdapter(IPAdapterModelLoader, IPAdapterApply):
        @classmethod
        def INPUT_TYPES(cls):
            return {
                "required": {
                    "ip_adapter_name": (["None"] + folder_paths.get_filename_list("ipadapter"),),
                    "clip_name": (["None"] + folder_paths.get_filename_list("clip_vision"),),
                    "model": ("MODEL",),
                    "image": ("IMAGE",),
                    "weight": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                    "noise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                },
                "optional": {
                    "ip_adapter_opt": ("IPADAPTER",),
                    "clip_vision_opt": ("CLIP_VISION",),
                    "attn_mask": ("MASK",),
                    "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                    "weight_type": (
                        ["standard", "prompt is more important", "style transfer (SDXL only)"],
                        {"default": "standard"},
                    ),
                    "enabled": ("BOOLEAN", {"default": True}),
                },
            }

        RETURN_TYPES = ("MODEL", "IPADAPTER", "CLIP_VISION")
        RETURN_NAMES = ("model", "pipeline", "clip_vision")
        CATEGORY = "Art Venture/IP Adapter"
        FUNCTION = "apply_ip_adapter"

        def apply_ip_adapter(
            self,
            ip_adapter_name,
            clip_name,
            model,
            image,
            weight,
            noise,
            ip_adapter_opt=None,
            clip_vision_opt=None,
            enabled=True,
            **kwargs,
        ):
            if not enabled:
                return (model, None, None)

            if ip_adapter_opt:
                if "ipadapter" in ip_adapter_opt:
                    ip_adapter = ip_adapter_opt["ipadapter"]["model"]
                else:
                    ip_adapter = ip_adapter_opt
            else:
                assert ip_adapter_name != "None", "IP Adapter name must be specified"
                ip_adapter = loader.load_ipadapter_model(ip_adapter_name)[0]

            if clip_vision_opt:
                clip_vision = clip_vision_opt
            elif ip_adapter_opt and "clipvision" in ip_adapter_opt:
                clip_vision = ip_adapter_opt["clipvision"]["model"]
            else:
                assert clip_name != "None", "Clip vision name must be specified"
                clip_path = folder_paths.get_full_path("clip_vision", clip_name)
                clip_vision = comfy.clip_vision.load(clip_path)

            pipeline = {"ipadapter": {"model": ip_adapter}, "clipvision": {"model": clip_vision}}

            res: Tuple = apply.apply_ipadapter(model, pipeline, image=image, weight=weight, **kwargs)
            res += (pipeline, clip_vision)

            return res

```
