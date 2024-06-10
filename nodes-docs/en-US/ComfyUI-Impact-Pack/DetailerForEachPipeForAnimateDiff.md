---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# Detailer For AnimateDiff (SEGS/pipe)
## Documentation
- Class name: `DetailerForEachPipeForAnimateDiff`
- Category: `ImpactPack/Detailer`
- Output node: `False`

This node is designed to apply detailed processing for each pipe within the context of animating differences, focusing on enhancing or modifying the animation output by iterating through each pipe segment. It aims to refine the animation process by applying specific detail enhancements tailored to the animation's requirements.
## Input types
### Required
- **`image_frames`**
    - The 'image_frames' input represents the sequence of images to be processed, serving as the foundation for animation detailing and enhancement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`segs`**
    - The 'segs' input specifies segmentation information, crucial for identifying and isolating different elements within the images for targeted detailing.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Image, List[Segment]]`
- **`guide_size`**
    - Specifies the size used for guiding the detailing process, affecting how details are scaled and applied across the animation frames.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guide_size_for`**
    - A boolean flag that determines whether the guide size is applied based on bounding boxes or crop regions, influencing the detailing scope.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`max_size`**
    - Defines the maximum size limit for the detailing process, ensuring that the enhancements stay within computational bounds.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - The seed value for random number generation, ensuring reproducibility and consistency in the detailing outcomes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps or iterations for the detailing process, directly impacting the depth of detailing applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration parameter affecting the detailing algorithm's behavior, allowing for fine-tuning of the process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the sampler to be used in the detailing process, influencing the algorithm's approach to detail generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler parameter controls the progression of steps in the detailing process, affecting how details evolve over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - A parameter to adjust the level of denoising applied during detailing, balancing detail clarity with noise reduction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`feather`**
    - Controls the feathering of edges in detailed segments, smoothing transitions for a more cohesive visual output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`basic_pipe`**
    - The basic processing pipeline to be used as a reference or starting point for the detailing process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `BasicPipe`
- **`refiner_ratio`**
    - Optional parameter to adjust the ratio of refinement applied, allowing for customization of the detailing intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`detailer_hook`**
    - unknown
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `unknown`
- **`refiner_basic_pipe_opt`**
    - unknown
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `unknown`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The enhanced image frames after detailing, showcasing the applied enhancements and modifications.
    - Python dtype: `List[Image]`
- **`segs`**
    - Comfy dtype: `SEGS`
    - The updated segmentation information post-detailing, reflecting changes made to individual segments.
    - Python dtype: `Tuple[Image, List[Segment]]`
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The basic processing pipeline, potentially modified through the detailing process.
    - Python dtype: `BasicPipe`
- **`cnet_images`**
    - Comfy dtype: `IMAGE`
    - A collection of images generated during the detailing process, providing additional visual outputs.
    - Python dtype: `List[Image]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)



## Source code
```python
class DetailerForEachPipeForAnimateDiff:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                      "image_frames": ("IMAGE", ),
                      "segs": ("SEGS", ),
                      "guide_size": ("FLOAT", {"default": 384, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                      "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "bbox", "label_off": "crop_region"}),
                      "max_size": ("FLOAT", {"default": 1024, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                      "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                      "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                      "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                      "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                      "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                      "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
                      "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                      "basic_pipe": ("BASIC_PIPE", ),
                      "refiner_ratio": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0}),
                     },
                "optional": {
                     "detailer_hook": ("DETAILER_HOOK",),
                     "refiner_basic_pipe_opt": ("BASIC_PIPE",),
                     # "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                     # "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                    }
                }

    RETURN_TYPES = ("IMAGE", "SEGS", "BASIC_PIPE", "IMAGE")
    RETURN_NAMES = ("image", "segs", "basic_pipe", "cnet_images")
    OUTPUT_IS_LIST = (False, False, False, True)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    @staticmethod
    def doit(image_frames, segs, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler,
             denoise, feather, basic_pipe, refiner_ratio=None, detailer_hook=None, refiner_basic_pipe_opt=None,
             inpaint_model=False, noise_mask_feather=0):

        enhanced_segs = []
        cnet_image_list = []

        for sub_seg in segs[1]:
            single_seg = segs[0], [sub_seg]
            enhanced_seg, cnet_images = SEGSDetailerForAnimateDiff().do_detail(image_frames, single_seg, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler,
                                                                               denoise, basic_pipe, refiner_ratio, refiner_basic_pipe_opt, inpaint_model, noise_mask_feather)

            image_frames = SEGSPaste.doit(image_frames, enhanced_seg, feather, alpha=255)[0]

            if cnet_images is not None:
                cnet_image_list.extend(cnet_images)

            if detailer_hook is not None:
                detailer_hook.post_paste(image_frames)

            enhanced_segs += enhanced_seg[1]

        new_segs = segs[0], enhanced_segs
        return image_frames, new_segs, basic_pipe, cnet_image_list

```
