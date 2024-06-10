---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# MaskDetailer (pipe)
## Documentation
- Class name: `MaskDetailerPipe`
- Category: `ImpactPack/Detailer`
- Output node: `False`

The MaskDetailerPipe node is designed to enhance and refine mask details within images, leveraging advanced image processing techniques to improve the visual quality and accuracy of masks in various applications.
## Input types
### Required
- **`image`**
    - The 'image' parameter specifies the input image to be processed, serving as the primary subject for mask detailing and enhancement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The 'mask' parameter provides the initial mask to be refined, playing a key role in the detailing process by indicating areas of interest.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`basic_pipe`**
    - The 'basic_pipe' parameter refers to a set of pre-configured models and settings used as a baseline for the detailing process, ensuring consistency and quality in output.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`guide_size`**
    - Specifies the size of the guide for the detailing process, affecting the level of detail achievable.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`guide_size_for`**
    - Specifies the guide size for the detailing process, affecting the precision and detail of the enhancement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `int`
- **`max_size`**
    - Defines the maximum size limit for the detailing process, ensuring the output stays within desired dimensions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`mask_mode`**
    - unknown
    - Comfy dtype: `BOOLEAN`
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
    - Specifies the sampler to use during the detailing process, affecting the quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for the detailing process, impacting the efficiency and outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Flag to enable or disable denoising during the detailing process, affecting the clarity of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`feather`**
    - Feathering parameter to smooth edges in the detailing process, enhancing the visual quality of the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - Factor by which to crop the image during the detailing process, affecting the focus area.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - Minimum size of details to be dropped during the detailing, affecting the level of detail retained.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`refiner_ratio`**
    - Ratio for refining the mask, affecting the intensity of refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - The size of the batch for processing, affecting the throughput of the detailing process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cycle`**
    - Number of cycles to perform the detailing process, affecting the thoroughness of enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`refiner_basic_pipe_opt`**
    - Optional parameter for an alternative set of models and settings for refining, offering customization.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple or None`
- **`detailer_hook`**
    - Hook for custom detailing logic, allowing for extended functionality.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `callable or None`
- **`inpaint_model`**
    - Flag to enable or disable the use of an inpainting model during the detailing process, affecting the handling of missing areas.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_mask_feather`**
    - Feathering parameter for the noise mask, affecting the blending of noise in the detailing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The refined or enhanced image after mask detailing, showcasing improved visual quality.
    - Python dtype: `torch.Tensor`
- **`cropped_refined`**
    - Comfy dtype: `IMAGE`
    - A list of cropped and refined images, highlighting detailed areas of interest.
    - Python dtype: `list`
- **`cropped_enhanced_alpha`**
    - Comfy dtype: `IMAGE`
    - A list of cropped images with enhanced alpha channels, providing transparency details.
    - Python dtype: `list`
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The set of models and settings used in the detailing process, returned for potential further use.
    - Python dtype: `tuple`
- **`refiner_basic_pipe_opt`**
    - Comfy dtype: `BASIC_PIPE`
    - The optional set of alternative models and settings for refining, if used, returned for potential further use.
    - Python dtype: `tuple or None`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskDetailerPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "image": ("IMAGE", ),
                    "mask": ("MASK", ),
                    "basic_pipe": ("BASIC_PIPE",),

                    "guide_size": ("FLOAT", {"default": 384, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                    "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "mask bbox", "label_off": "crop region"}),
                    "max_size": ("FLOAT", {"default": 1024, "min": 64, "max": nodes.MAX_RESOLUTION, "step": 8}),
                    "mask_mode": ("BOOLEAN", {"default": True, "label_on": "masked only", "label_off": "whole"}),

                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                    "scheduler": (core.SCHEDULERS,),
                    "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),

                    "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                    "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 10, "step": 0.1}),
                    "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),
                    "refiner_ratio": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0}),
                    "batch_size": ("INT", {"default": 1, "min": 1, "max": 100}),

                    "cycle": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                   },
                "optional": {
                    "refiner_basic_pipe_opt": ("BASIC_PIPE", ),
                    "detailer_hook": ("DETAILER_HOOK",),
                    "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                   }
                }

    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "BASIC_PIPE", "BASIC_PIPE")
    RETURN_NAMES = ("image", "cropped_refined", "cropped_enhanced_alpha", "basic_pipe", "refiner_basic_pipe_opt")
    OUTPUT_IS_LIST = (False, True, True, False, False)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, image, mask, basic_pipe, guide_size, guide_size_for, max_size, mask_mode,
             seed, steps, cfg, sampler_name, scheduler, denoise,
             feather, crop_factor, drop_size, refiner_ratio, batch_size, cycle=1,
             refiner_basic_pipe_opt=None, detailer_hook=None, inpaint_model=False, noise_mask_feather=0):

        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: MaskDetailer does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        model, clip, vae, positive, negative = basic_pipe

        if refiner_basic_pipe_opt is None:
            refiner_model, refiner_clip, refiner_positive, refiner_negative = None, None, None, None
        else:
            refiner_model, refiner_clip, _, refiner_positive, refiner_negative = refiner_basic_pipe_opt

        # create segs
        if mask is not None:
            mask = make_2d_mask(mask)
            segs = core.mask_to_segs(mask, False, crop_factor, False, drop_size)
        else:
            segs = ((image.shape[1], image.shape[2]), [])

        enhanced_img_batch = None
        cropped_enhanced_list = []
        cropped_enhanced_alpha_list = []

        for i in range(batch_size):
            if mask is not None:
                enhanced_img, _, cropped_enhanced, cropped_enhanced_alpha, _, _ = \
                    DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed+i, steps,
                                              cfg, sampler_name, scheduler, positive, negative, denoise, feather, mask_mode,
                                              force_inpaint=True, wildcard_opt=None, detailer_hook=detailer_hook,
                                              refiner_ratio=refiner_ratio, refiner_model=refiner_model, refiner_clip=refiner_clip,
                                              refiner_positive=refiner_positive, refiner_negative=refiner_negative,
                                              cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            else:
                enhanced_img, cropped_enhanced, cropped_enhanced_alpha = image, [], []

            if enhanced_img_batch is None:
                enhanced_img_batch = enhanced_img
            else:
                enhanced_img_batch = torch.cat((enhanced_img_batch, enhanced_img), dim=0)

            cropped_enhanced_list += cropped_enhanced
            cropped_enhanced_alpha_list += cropped_enhanced_alpha

        # set fallback image
        if len(cropped_enhanced_list) == 0:
            cropped_enhanced_list = [empty_pil_tensor()]

        if len(cropped_enhanced_alpha_list) == 0:
            cropped_enhanced_alpha_list = [empty_pil_tensor()]

        return enhanced_img_batch, cropped_enhanced_list, cropped_enhanced_alpha_list, basic_pipe, refiner_basic_pipe_opt

```
