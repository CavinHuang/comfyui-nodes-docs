---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# PreDetailerFix
## Documentation
- Class name: `easy preDetailerFix`
- Category: `EasyUse/Fix`
- Output node: `False`

The 'easy preDetailerFix' node is designed to enhance and refine the details of images before further processing or final output. It operates within a pipeline to adjust and optimize image characteristics, such as resolution and detail sharpness, based on predefined or custom settings.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration for image processing, affecting how images are detailed and enhanced.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `tuple`
- **`guide_size`**
    - Determines the target size for guiding the detail enhancement process, influencing the granularity of details.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guide_size_for`**
    - A boolean flag indicating whether the guide size is applied to bounding boxes or the crop region, affecting the focus area of detail enhancement.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`max_size`**
    - Sets the maximum size limit for the images being processed, ensuring they do not exceed a specified resolution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Provides a seed value for random number generation, ensuring reproducibility of the detailing process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Specifies the number of steps to be taken in the detailing process, affecting the depth of detail enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the configuration setting for the detailing process, influencing the intensity of detail enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the sampler to be used in the detailing process, affecting the method of detail generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for the detailing process, determining the sequence and timing of operations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the level of denoising applied to the images, balancing between detail preservation and noise reduction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`feather`**
    - Sets the feathering amount applied to the edges of the images, smoothing transitions for a more natural look.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_mask`**
    - Specifies the noise mask settings, affecting the application of noise in the detailing process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`force_inpaint`**
    - Indicates whether inpainting is forcefully applied, affecting the handling of missing or damaged areas in images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`drop_size`**
    - Determines the size of drops used in the process, influencing the detailing effect on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`wildcard`**
    - Provides a wildcard input for custom settings or parameters, offering flexibility in the detailing process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`cycle`**
    - Specifies the number of cycles the detailing process is repeated, affecting the thoroughness of enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`bbox_segm_pipe`**
    - Defines the pipeline settings for bounding box and segmentation, influencing the detail enhancement based on object detection.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `tuple`
- **`sam_pipe`**
    - Specifies the SAM pipeline configuration, affecting the selective attention model used in detailing.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `tuple`
- **`optional_image`**
    - Allows for an optional image input, providing additional context or reference for the detailing process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the modified pipeline configuration after the detailing process, reflecting the applied enhancements and adjustments.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class preDetailerFix:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
             "pipe": ("PIPE_LINE",),
             "guide_size": ("FLOAT", {"default": 256, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
             "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "bbox", "label_off": "crop_region"}),
             "max_size": ("FLOAT", {"default": 768, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
             "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
             "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
             "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
             "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
             "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
             "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
             "noise_mask": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
             "force_inpaint": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
             "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),
             "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),
             "cycle": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
        },
            "optional": {
                "bbox_segm_pipe": ("PIPE_LINE",),
                "sam_pipe": ("PIPE_LINE",),
                "optional_image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Fix"

    def doit(self, pipe, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name, scheduler, denoise, feather, noise_mask, force_inpaint, drop_size, wildcard, cycle, bbox_segm_pipe=None, sam_pipe=None, optional_image=None):

        model = pipe["model"] if "model" in pipe else None
        if model is None:
            raise Exception(f"[ERROR] pipe['model'] is missing")
        clip = pipe["clip"] if"clip" in pipe else None
        if clip is None:
            raise Exception(f"[ERROR] pipe['clip'] is missing")
        vae = pipe["vae"] if "vae" in pipe else None
        if vae is None:
            raise Exception(f"[ERROR] pipe['vae'] is missing")
        if optional_image is not None:
            images = optional_image
        else:
            images = pipe["images"] if "images" in pipe else None
            if images is None:
                raise Exception(f"[ERROR] pipe['image'] is missing")
        positive = pipe["positive"] if "positive" in pipe else None
        if positive is None:
            raise Exception(f"[ERROR] pipe['positive'] is missing")
        negative = pipe["negative"] if "negative" in pipe else None
        if negative is None:
            raise Exception(f"[ERROR] pipe['negative'] is missing")
        bbox_segm_pipe = bbox_segm_pipe or (pipe["bbox_segm_pipe"] if pipe and "bbox_segm_pipe" in pipe else None)
        if bbox_segm_pipe is None:
            raise Exception(f"[ERROR] bbox_segm_pipe or pipe['bbox_segm_pipe'] is missing")
        sam_pipe = sam_pipe or (pipe["sam_pipe"] if pipe and "sam_pipe" in pipe else None)
        if sam_pipe is None:
            raise Exception(f"[ERROR] sam_pipe or pipe['sam_pipe'] is missing")

        loader_settings = pipe["loader_settings"] if "loader_settings" in pipe else {}

        new_pipe = {
            "images": images,
            "model": model,
            "clip": clip,
            "vae": vae,
            "positive": positive,
            "negative": negative,
            "seed": seed,

            "bbox_segm_pipe": bbox_segm_pipe,
            "sam_pipe": sam_pipe,

            "loader_settings": loader_settings,

            "detail_fix_settings": {
                "guide_size": guide_size,
                "guide_size_for": guide_size_for,
                "max_size": max_size,
                "seed": seed,
                "steps": steps,
                "cfg": cfg,
                "sampler_name": sampler_name,
                "scheduler": scheduler,
                "denoise": denoise,
                "feather": feather,
                "noise_mask": noise_mask,
                "force_inpaint": force_inpaint,
                "drop_size": drop_size,
                "wildcard": wildcard,
                "cycle": cycle
            }
        }


        del bbox_segm_pipe
        del sam_pipe

        return (new_pipe,)

```
