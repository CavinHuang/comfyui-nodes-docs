---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# FaceDetailer (AV)
## Documentation
- Class name: `AV_FaceDetailer`
- Category: `ArtVenture/Detailer`
- Output node: `False`

The AV_FaceDetailer node is designed to enhance facial details in images within the ArtVenture/Detailer category. It leverages advanced detailing techniques to refine facial features, offering an optional toggle to enable or disable this enhancement process.
## Input types
### Required
- **`image`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`guide_size`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`guide_size_for`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`max_size`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`cfg`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sampler_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`scheduler`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`positive`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`negative`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`denoise`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`feather`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`noise_mask`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`force_inpaint`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`bbox_threshold`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`bbox_dilation`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`bbox_crop_factor`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sam_detection_hint`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`sam_dilation`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`sam_threshold`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sam_bbox_expansion`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`sam_mask_hint_threshold`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sam_mask_hint_use_negative`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`drop_size`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`bbox_detector`**
    - unknown
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `unknown`
- **`wildcard`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`cycle`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
### Optional
- **`sam_model_opt`**
    - unknown
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `unknown`
- **`segm_detector_opt`**
    - unknown
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `unknown`
- **`detailer_hook`**
    - unknown
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `unknown`
- **`inpaint_model`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`noise_mask_feather`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`enabled`**
    - This parameter allows users to enable or disable the face detailing process, providing flexibility in how images are processed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`cropped_refined`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`cropped_enhanced_alpha`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`mask`**
    - Comfy dtype: `MASK`
    - unknown
    - Python dtype: `unknown`
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - unknown
    - Python dtype: `unknown`
- **`cnet_images`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - The output includes the original image with facial details enhanced if enabled, along with additional processing information.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class AV_FaceDetailer(FaceDetailer):
        @classmethod
        def INPUT_TYPES(s):
            inputs = FaceDetailer.INPUT_TYPES()
            inputs["optional"]["enabled"] = (
                "BOOLEAN",
                {"default": True, "label_on": "enabled", "label_off": "disabled"},
            )
            return inputs

        CATEGORY = "ArtVenture/Detailer"

        def args_to_pipe(self, args: dict):
            hook_args = [
                "model",
                "clip",
                "vae",
                "positive",
                "negative",
                "wildcard",
                "bbox_detector",
                "segm_detector_opt",
                "sam_model_opt",
                "detailer_hook",
            ]

            pipe_args = []
            for arg in hook_args:
                pipe_args.append(args.get(arg, None))

            return tuple(pipe_args + [None, None, None, None])

        def doit(self, image, *args, enabled=True, **kwargs):
            if enabled:
                return super().doit(image, *args, **kwargs)
            else:
                pipe = self.args_to_pipe(kwargs)
                return (image, [], [], None, pipe, [])

```
