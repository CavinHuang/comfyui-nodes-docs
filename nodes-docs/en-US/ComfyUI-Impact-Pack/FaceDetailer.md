---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# FaceDetailer
## Documentation
- Class name: `FaceDetailer`
- Category: `ImpactPack/Simple`
- Output node: `False`

The FaceDetailer node is designed to enhance the details of faces in images, focusing on improving visual quality and clarity. It is not intended for video detailing but excels in processing still images to refine facial features and expressions.
## Input types
### Required
- **`image`**
    - The input image to be enhanced. It is the primary subject for the detailing process, focusing on facial features.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
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
    - Specifies the size for guiding the enhancement process, influencing the level of detail achievable.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`guide_size_for`**
    - Determines the size for bounding box guidance, affecting the focus area of the enhancement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `int`
- **`max_size`**
    - The maximum size limit for the images being processed, ensuring optimal performance and quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
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
    - The name of the sampling method used in the enhancement process, affecting the detailing outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Controls the scheduling of the enhancement steps, managing the progression of detailing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`negative`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`denoise`**
    - A flag to enable or disable denoising in the enhancement process, affecting image clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`feather`**
    - The feathering amount applied to the edges of the enhancement areas, smoothing transitions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_mask`**
    - A mask applied to specify areas for noise reduction, enhancing visual clarity in targeted regions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `torch.Tensor`
- **`force_inpaint`**
    - Forces the inpainting process in specified areas, allowing for targeted detail correction.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`bbox_threshold`**
    - The threshold for bounding box detection, influencing the selection of areas for enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_dilation`**
    - The dilation amount for bounding boxes, expanding the area considered for detailing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bbox_crop_factor`**
    - Determines the cropping factor for bounding boxes, affecting the area of the image focused on.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sam_detection_hint`**
    - Hints for the SAM detection process, guiding the detection of areas for enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sam_dilation`**
    - The dilation setting for SAM detection, affecting the expansiveness of area selection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sam_threshold`**
    - The threshold for SAM detection, determining the sensitivity of area selection for enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sam_bbox_expansion`**
    - Controls the expansion of bounding boxes based on SAM detection, affecting the enhancement focus area.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`sam_mask_hint_threshold`**
    - The threshold for applying mask hints in SAM detection, influencing the precision of area selection.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sam_mask_hint_use_negative`**
    - Determines whether negative hints are used in SAM mask detection, affecting the exclusion of areas from enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`drop_size`**
    - Specifies the size below which areas are dropped from consideration, focusing enhancement on significant features.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bbox_detector`**
    - The model used for bounding box detection, crucial for identifying areas of interest for detailing.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `torch.nn.Module`
- **`wildcard`**
    - A wildcard option for extending functionality or customization within the enhancement process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`cycle`**
    - The number of cycles the enhancement process is run, affecting the depth of detailing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`sam_model_opt`**
    - Optional settings for the SAM model, allowing for customization of the detection process.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `dict`
- **`segm_detector_opt`**
    - Optional settings for the segmentation detector, influencing the accuracy and focus of segmentation.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `dict`
- **`detailer_hook`**
    - A hook for additional processing or customization within the detailing workflow.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `callable`
- **`inpaint_model`**
    - Enables or disables the use of an inpainting model for detail correction within specified areas.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_mask_feather`**
    - The feathering amount applied to the noise mask, smoothing the application of noise reduction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The enhanced image with improved facial details, showcasing the node's ability to refine and clarify facial features.
    - Python dtype: `torch.Tensor`
- **`cropped_refined`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`cropped_enhanced_alpha`**
    - Comfy dtype: `IMAGE`
    - A list of alpha masks corresponding to the cropped and enhanced images, used for blending or further processing.
    - Python dtype: `List[torch.Tensor]`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask generated during the enhancement process, indicating areas of focus or modification.
    - Python dtype: `torch.Tensor`
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - A tuple containing models and configurations used in the detailing process, encapsulating the operational setup.
    - Python dtype: `Tuple[torch.nn.Module]`
- **`cnet_images`**
    - Comfy dtype: `IMAGE`
    - A list of images processed through the control net, providing additional detail enhancements.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [FaceDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/FaceDetailerPipe.md)
    - [MaskToImage](../../Comfy/Nodes/MaskToImage.md)
    - Reroute
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [PlaySound|pysssss](../../ComfyUI-Custom-Scripts/Nodes/PlaySound|pysssss.md)
    - [InvertMask](../../Comfy/Nodes/InvertMask.md)
    - [ImageInvert](../../Comfy/Nodes/ImageInvert.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [ImageBlend](../../Comfy/Nodes/ImageBlend.md)



## Source code
```python
class FaceDetailer:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "image": ("IMAGE", ),
                     "model": ("MODEL",),
                     "clip": ("CLIP",),
                     "vae": ("VAE",),
                     "guide_size": ("FLOAT", {"default": 384, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                     "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "bbox", "label_off": "crop_region"}),
                     "max_size": ("FLOAT", {"default": 1024, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (core.SCHEDULERS,),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
                     "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                     "noise_mask": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
                     "force_inpaint": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),

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

                     "bbox_detector": ("BBOX_DETECTOR", ),
                     "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),

                     "cycle": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                     },
                "optional": {
                    "sam_model_opt": ("SAM_MODEL", ),
                    "segm_detector_opt": ("SEGM_DETECTOR", ),
                    "detailer_hook": ("DETAILER_HOOK",),
                    "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                }}

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "MASK", "DETAILER_PIPE", "IMAGE")
    RETURN_NAMES = ("image", "cropped_refined", "cropped_enhanced_alpha", "mask", "detailer_pipe", "cnet_images")
    OUTPUT_IS_LIST = (False, True, True, False, False, True)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Simple"

    @staticmethod
    def enhance_face(image, model, clip, vae, guide_size, guide_size_for_bbox, max_size, seed, steps, cfg, sampler_name, scheduler,
                     positive, negative, denoise, feather, noise_mask, force_inpaint,
                     bbox_threshold, bbox_dilation, bbox_crop_factor,
                     sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold,
                     sam_mask_hint_use_negative, drop_size,
                     bbox_detector, segm_detector=None, sam_model_opt=None, wildcard_opt=None, detailer_hook=None,
                     refiner_ratio=None, refiner_model=None, refiner_clip=None, refiner_positive=None, refiner_negative=None, cycle=1,
                     inpaint_model=False, noise_mask_feather=0):

        # make default prompt as 'face' if empty prompt for CLIPSeg
        bbox_detector.setAux('face')
        segs = bbox_detector.detect(image, bbox_threshold, bbox_dilation, bbox_crop_factor, drop_size, detailer_hook=detailer_hook)
        bbox_detector.setAux(None)

        # bbox + sam combination
        if sam_model_opt is not None:
            sam_mask = core.make_sam_mask(sam_model_opt, segs, image, sam_detection_hint, sam_dilation,
                                          sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold,
                                          sam_mask_hint_use_negative, )
            segs = core.segs_bitwise_and_mask(segs, sam_mask)

        elif segm_detector is not None:
            segm_segs = segm_detector.detect(image, bbox_threshold, bbox_dilation, bbox_crop_factor, drop_size)

            if (hasattr(segm_detector, 'override_bbox_by_segm') and segm_detector.override_bbox_by_segm and
                    not (detailer_hook is not None and not hasattr(detailer_hook, 'override_bbox_by_segm'))):
                segs = segm_segs
            else:
                segm_mask = core.segs_to_combined_mask(segm_segs)
                segs = core.segs_bitwise_and_mask(segs, segm_mask)

        if len(segs[1]) > 0:
            enhanced_img, _, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list, new_segs = \
                DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for_bbox, max_size, seed, steps, cfg,
                                          sampler_name, scheduler, positive, negative, denoise, feather, noise_mask,
                                          force_inpaint, wildcard_opt, detailer_hook,
                                          refiner_ratio=refiner_ratio, refiner_model=refiner_model,
                                          refiner_clip=refiner_clip, refiner_positive=refiner_positive,
                                          refiner_negative=refiner_negative,
                                          cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
        else:
            enhanced_img = image
            cropped_enhanced = []
            cropped_enhanced_alpha = []
            cnet_pil_list = []

        # Mask Generator
        mask = core.segs_to_combined_mask(segs)

        if len(cropped_enhanced) == 0:
            cropped_enhanced = [empty_pil_tensor()]

        if len(cropped_enhanced_alpha) == 0:
            cropped_enhanced_alpha = [empty_pil_tensor()]

        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]

        return enhanced_img, cropped_enhanced, cropped_enhanced_alpha, mask, cnet_pil_list

    def doit(self, image, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler,
             positive, negative, denoise, feather, noise_mask, force_inpaint,
             bbox_threshold, bbox_dilation, bbox_crop_factor,
             sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold,
             sam_mask_hint_use_negative, drop_size, bbox_detector, wildcard, cycle=1,
             sam_model_opt=None, segm_detector_opt=None, detailer_hook=None, inpaint_model=False, noise_mask_feather=0):

        result_img = None
        result_mask = None
        result_cropped_enhanced = []
        result_cropped_enhanced_alpha = []
        result_cnet_images = []

        if len(image) > 1:
            print(f"[Impact Pack] WARN: FaceDetailer is not a node designed for video detailing. If you intend to perform video detailing, please use Detailer For AnimateDiff.")

        for i, single_image in enumerate(image):
            enhanced_img, cropped_enhanced, cropped_enhanced_alpha, mask, cnet_pil_list = FaceDetailer.enhance_face(
                single_image.unsqueeze(0), model, clip, vae, guide_size, guide_size_for, max_size, seed + i, steps, cfg, sampler_name, scheduler,
                positive, negative, denoise, feather, noise_mask, force_inpaint,
                bbox_threshold, bbox_dilation, bbox_crop_factor,
                sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold,
                sam_mask_hint_use_negative, drop_size, bbox_detector, segm_detector_opt, sam_model_opt, wildcard, detailer_hook,
                cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)

            result_img = torch.cat((result_img, enhanced_img), dim=0) if result_img is not None else enhanced_img
            result_mask = torch.cat((result_mask, mask), dim=0) if result_mask is not None else mask
            result_cropped_enhanced.extend(cropped_enhanced)
            result_cropped_enhanced_alpha.extend(cropped_enhanced_alpha)
            result_cnet_images.extend(cnet_pil_list)

        pipe = (model, clip, vae, positive, negative, wildcard, bbox_detector, segm_detector_opt, sam_model_opt, detailer_hook, None, None, None, None)
        return result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, pipe, result_cnet_images

```
