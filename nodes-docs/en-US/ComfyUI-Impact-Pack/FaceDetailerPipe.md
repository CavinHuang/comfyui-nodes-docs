---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# FaceDetailer (pipe)
## Documentation
- Class name: `FaceDetailerPipe`
- Category: `ImpactPack/Simple`
- Output node: `False`

The FaceDetailerPipe node specializes in enhancing facial details within images, leveraging advanced processing techniques to refine and accentuate facial features for improved visual quality.
## Input types
### Required
- **`image`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`detailer_pipe`**
    - Represents the core data structure for detailing operations, essential for processing and enhancing facial details within images.
    - Comfy dtype: `DETAILER_PIPE`
    - Python dtype: `tuple`
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
- **`refiner_ratio`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`cycle`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
### Optional
- **`inpaint_model`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
- **`noise_mask_feather`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
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
    - Outputs the enhanced detailer_pipe structure, encapsulating the refined facial details for subsequent processing or visualization.
    - Python dtype: `tuple`
- **`cnet_images`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - [PlaySound|pysssss](../../ComfyUI-Custom-Scripts/Nodes/PlaySound|pysssss.md)
    - Reroute
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [ReroutePrimitive|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ReroutePrimitive|pysssss.md)
    - [DetailerForEachDebugPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebugPipe.md)
    - [DetailerPipeToBasicPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerPipeToBasicPipe.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [FaceDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/FaceDetailerPipe.md)



## Source code
```python
class FaceDetailerPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "image": ("IMAGE", ),
                    "detailer_pipe": ("DETAILER_PIPE",),
                    "guide_size": ("FLOAT", {"default": 384, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                    "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "bbox", "label_off": "crop_region"}),
                    "max_size": ("FLOAT", {"default": 1024, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                    "scheduler": (core.SCHEDULERS,),
                    "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
                    "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                    "noise_mask": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
                    "force_inpaint": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),

                    "bbox_threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "bbox_dilation": ("INT", {"default": 10, "min": -512, "max": 512, "step": 1}),
                    "bbox_crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 10, "step": 0.1}),

                    "sam_detection_hint": (["center-1", "horizontal-2", "vertical-2", "rect-4", "diamond-4", "mask-area", "mask-points", "mask-point-bbox", "none"],),
                    "sam_dilation": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                    "sam_threshold": ("FLOAT", {"default": 0.93, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "sam_bbox_expansion": ("INT", {"default": 0, "min": 0, "max": 1000, "step": 1}),
                    "sam_mask_hint_threshold": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "sam_mask_hint_use_negative": (["False", "Small", "Outter"],),

                    "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),
                    "refiner_ratio": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0}),

                    "cycle": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                   },
                "optional": {
                    "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                   }
                }

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "MASK", "DETAILER_PIPE", "IMAGE")
    RETURN_NAMES = ("image", "cropped_refined", "cropped_enhanced_alpha", "mask", "detailer_pipe", "cnet_images")
    OUTPUT_IS_LIST = (False, True, True, False, False, True)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Simple"

    def doit(self, image, detailer_pipe, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler,
             denoise, feather, noise_mask, force_inpaint, bbox_threshold, bbox_dilation, bbox_crop_factor,
             sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion,
             sam_mask_hint_threshold, sam_mask_hint_use_negative, drop_size, refiner_ratio=None,
             cycle=1, inpaint_model=False, noise_mask_feather=0):

        result_img = None
        result_mask = None
        result_cropped_enhanced = []
        result_cropped_enhanced_alpha = []
        result_cnet_images = []

        if len(image) > 1:
            print(f"[Impact Pack] WARN: FaceDetailer is not a node designed for video detailing. If you intend to perform video detailing, please use Detailer For AnimateDiff.")

        model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector, sam_model_opt, detailer_hook, \
            refiner_model, refiner_clip, refiner_positive, refiner_negative = detailer_pipe

        for i, single_image in enumerate(image):
            enhanced_img, cropped_enhanced, cropped_enhanced_alpha, mask, cnet_pil_list = FaceDetailer.enhance_face(
                single_image.unsqueeze(0), model, clip, vae, guide_size, guide_size_for, max_size, seed + i, steps, cfg, sampler_name, scheduler,
                positive, negative, denoise, feather, noise_mask, force_inpaint,
                bbox_threshold, bbox_dilation, bbox_crop_factor,
                sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold,
                sam_mask_hint_use_negative, drop_size, bbox_detector, segm_detector, sam_model_opt, wildcard, detailer_hook,
                refiner_ratio=refiner_ratio, refiner_model=refiner_model,
                refiner_clip=refiner_clip, refiner_positive=refiner_positive, refiner_negative=refiner_negative,
                cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)

            result_img = torch.cat((result_img, enhanced_img), dim=0) if result_img is not None else enhanced_img
            result_mask = torch.cat((result_mask, mask), dim=0) if result_mask is not None else mask
            result_cropped_enhanced.extend(cropped_enhanced)
            result_cropped_enhanced_alpha.extend(cropped_enhanced_alpha)
            result_cnet_images.extend(cnet_pil_list)

        if len(result_cropped_enhanced) == 0:
            result_cropped_enhanced = [empty_pil_tensor()]

        if len(result_cropped_enhanced_alpha) == 0:
            result_cropped_enhanced_alpha = [empty_pil_tensor()]

        if len(result_cnet_images) == 0:
            result_cnet_images = [empty_pil_tensor()]

        return result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, detailer_pipe, result_cnet_images

```
