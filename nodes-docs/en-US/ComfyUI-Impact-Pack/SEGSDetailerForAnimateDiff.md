---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# SEGSDetailer For AnimateDiff (SEGS/pipe)
## Documentation
- Class name: `SEGSDetailerForAnimateDiff`
- Category: `ImpactPack/Detailer`
- Output node: `False`

The SEGSDetailerForAnimateDiff node is designed to enhance the segmentation details of animated differences in images, utilizing various parameters such as guide size, seed, and configuration settings to refine the output. It aims to improve the visual quality of animations by adjusting segmentation details for more precise and visually appealing results.
## Input types
### Required
- **`image_frames`**
    - Specifies the sequence of image frames to be detailed. It plays a crucial role in determining the animation's visual flow and quality.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`segs`**
    - Represents the segmentation information for the input images, which is essential for identifying and enhancing specific areas within the animation.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[torch.Tensor]`
- **`guide_size`**
    - Determines the guiding size for the detailing process, affecting the level of detail and refinement applied to the segmentation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`guide_size_for`**
    - Specifies the target for the guide size, influencing how the detailing adjustments are applied across different segments.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`max_size`**
    - Sets the maximum size limit for the detailing process, ensuring that the enhancements remain within a manageable scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`seed`**
    - Provides a seed value for random number generation, contributing to the consistency and reproducibility of the detailing effects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the detailing process, directly impacting the depth of detail and refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration settings that dictate the overall behavior and parameters of the detailing process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Dict[str, Any]`
- **`sampler_name`**
    - Specifies the sampler to be used, influencing the method of detail enhancement based on the segmentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling strategy for the detailing process, affecting the timing and sequence of operations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Indicates whether denoising should be applied, which can help in reducing noise and improving the clarity of the detailed segments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`basic_pipe`**
    - Refers to the basic processing pipeline to be used, setting the foundation for the detailing operations.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `str`
- **`refiner_ratio`**
    - Optional parameter that specifies the ratio of refinement to be applied, allowing for fine-tuning of the detailing intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`refiner_basic_pipe_opt`**
    - Optional parameter that provides additional options for the basic refinement pipeline, offering further customization.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - Outputs the enhanced segmentation details, reflecting the improvements made during the detailing process.
    - Python dtype: `List[torch.Tensor]`
- **`cnet_images`**
    - Comfy dtype: `IMAGE`
    - Provides a list of images with applied content network enhancements, showcasing the detailed animation frames.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SEGSPaste](../../ComfyUI-Impact-Pack/Nodes/SEGSPaste.md)



## Source code
```python
class SEGSDetailerForAnimateDiff:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                     "image_frames": ("IMAGE", ),
                     "segs": ("SEGS", ),
                     "guide_size": ("FLOAT", {"default": 256, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                     "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "bbox", "label_off": "crop_region"}),
                     "max_size": ("FLOAT", {"default": 768, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                     "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
                     "basic_pipe": ("BASIC_PIPE",),
                     "refiner_ratio": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0})
                     },
                "optional": {
                     "refiner_basic_pipe_opt": ("BASIC_PIPE",),
                     # TODO: "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                     # TODO: "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                     }
                }

    RETURN_TYPES = ("SEGS", "IMAGE")
    RETURN_NAMES = ("segs", "cnet_images")
    OUTPUT_IS_LIST = (False, True)

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    @staticmethod
    def do_detail(image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler,
                  denoise, basic_pipe, refiner_ratio=None, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):

        model, clip, vae, positive, negative = basic_pipe
        if refiner_basic_pipe_opt is None:
            refiner_model, refiner_clip, refiner_positive, refiner_negative = None, None, None, None
        else:
            refiner_model, refiner_clip, _, refiner_positive, refiner_negative = refiner_basic_pipe_opt

        segs = core.segs_scale_match(segs, image_frames.shape)

        new_segs = []
        cnet_image_list = []

        for seg in segs[1]:
            cropped_image_frames = None

            for image in image_frames:
                image = image.unsqueeze(0)
                cropped_image = seg.cropped_image if seg.cropped_image is not None else crop_tensor4(image, seg.crop_region)
                cropped_image = to_tensor(cropped_image)
                if cropped_image_frames is None:
                    cropped_image_frames = cropped_image
                else:
                    cropped_image_frames = torch.concat((cropped_image_frames, cropped_image), dim=0)

            cropped_image_frames = cropped_image_frames.cpu().numpy()

            # It is assumed that AnimateDiff does not support conditioning masks based on test results, but it will be added for future consideration.
            cropped_positive = [
                [condition, {
                    k: core.crop_condition_mask(v, cropped_image_frames, seg.crop_region) if k == "mask" else v
                    for k, v in details.items()
                }]
                for condition, details in positive
            ]

            cropped_negative = [
                [condition, {
                    k: core.crop_condition_mask(v, cropped_image_frames, seg.crop_region) if k == "mask" else v
                    for k, v in details.items()
                }]
                for condition, details in negative
            ]

            enhanced_image_tensor, cnet_images = core.enhance_detail_for_animatediff(cropped_image_frames, model, clip, vae, guide_size, guide_size_for, max_size,
                                                                                     seg.bbox, seed, steps, cfg, sampler_name, scheduler,
                                                                                     cropped_positive, cropped_negative, denoise, seg.cropped_mask,
                                                                                     refiner_ratio=refiner_ratio, refiner_model=refiner_model,
                                                                                     refiner_clip=refiner_clip, refiner_positive=refiner_positive,
                                                                                     refiner_negative=refiner_negative, control_net_wrapper=seg.control_net_wrapper,
                                                                                     inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            if cnet_images is not None:
                cnet_image_list.extend(cnet_images)

            if enhanced_image_tensor is None:
                new_cropped_image = cropped_image_frames
            else:
                new_cropped_image = enhanced_image_tensor.cpu().numpy()

            new_seg = SEG(new_cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, None)
            new_segs.append(new_seg)

        return (segs[0], new_segs), cnet_image_list

    def doit(self, image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler,
             denoise, basic_pipe, refiner_ratio=None, refiner_basic_pipe_opt=None, inpaint_model=False, noise_mask_feather=0):

        segs, cnet_images = SEGSDetailerForAnimateDiff.do_detail(image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name,
                                                                 scheduler, denoise, basic_pipe, refiner_ratio, refiner_basic_pipe_opt,
                                                                 inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)

        if len(cnet_images) == 0:
            cnet_images = [empty_pil_tensor()]

        return (segs, cnet_images)

```
