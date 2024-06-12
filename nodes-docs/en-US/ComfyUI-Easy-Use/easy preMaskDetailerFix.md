---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# preMaskDetailerFix
## Documentation
- Class name: `easy preMaskDetailerFix`
- Category: `EasyUse/Fix`
- Output node: `False`

The `easy preMaskDetailerFix` node is designed to refine the details of a pre-masked image within a pipeline, leveraging various parameters to adjust the guide size, mask mode, and other aspects of the image processing to achieve optimal results.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration to be used for the detail refinement process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`mask`**
    - The mask to be applied for detail refinement, focusing on specific areas of the image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`guide_size`**
    - Determines the size of the guide used in the refinement process, affecting the granularity of detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guide_size_for`**
    - A boolean flag that toggles the guide size application between bounding box and crop region modes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`max_size`**
    - Sets the maximum size limit for the processed image, ensuring it stays within a manageable resolution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mask_mode`**
    - Controls whether the refinement is applied only to masked areas or the entire image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`seed`**
    - The seed value for random number generation, ensuring reproducibility of the process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Specifies the number of steps to be taken in the refinement process, impacting the depth of detail enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configures the strength of the conditioning factor, influencing the intensity of detail refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the sampler to be used during the refinement process, affecting the texture and quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the progression of refinement steps, optimizing the process flow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the level of denoising applied to the image, balancing detail preservation against noise reduction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`feather`**
    - Determines the feathering applied to the mask edges, smoothing transitions for a more natural look.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_factor`**
    - Adjusts the crop factor for the image, affecting the zoom level during the refinement process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`drop_size`**
    - Specifies the drop size for the refinement, influencing the scale of detail adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`refiner_ratio`**
    - Sets the ratio of refinement applied, adjusting the intensity of detail enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`batch_size`**
    - Determines the batch size for processing, affecting the throughput and speed of refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cycle`**
    - Specifies the number of cycles the refinement process is repeated, enhancing the depth of detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_image`**
    - An optional image input for additional context or reference in the refinement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`inpaint_model`**
    - A boolean flag indicating whether an inpainting model is used for masked areas, affecting the detail recovery.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_mask_feather`**
    - Specifies the feathering level for the noise mask, smoothing the transition between masked and unmasked areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the modified pipeline configuration after the detail refinement process.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class preMaskDetailerFix:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
             "pipe": ("PIPE_LINE",),
             "mask": ("MASK",),

             "guide_size": ("FLOAT", {"default": 384, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
             "guide_size_for": ("BOOLEAN", {"default": True, "label_on": "bbox", "label_off": "crop_region"}),
             "max_size": ("FLOAT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
             "mask_mode": ("BOOLEAN", {"default": True, "label_on": "masked only", "label_off": "whole"}),

             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
             "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
             "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
             "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
             "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
             "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),

             "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
             "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 10, "step": 0.1}),
             "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),
             "refiner_ratio": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0}),
             "batch_size": ("INT", {"default": 1, "min": 1, "max": 100}),
             "cycle": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
        },
            "optional": {
                # "patch": ("INPAINT_PATCH",),
                "optional_image": ("IMAGE",),
                "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
            },
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Fix"

    def doit(self, pipe, mask, guide_size, guide_size_for, max_size, mask_mode, seed, steps, cfg, sampler_name, scheduler, denoise, feather, crop_factor, drop_size,refiner_ratio, batch_size, cycle, optional_image=None, inpaint_model=False, noise_mask_feather=20):

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
        latent = pipe["samples"] if "samples" in pipe else None
        if latent is None:
            raise Exception(f"[ERROR] pipe['samples'] is missing")

        if 'noise_mask' not in latent:
            if images is None:
                raise Exception("No Images found")
            if vae is None:
                raise Exception("No VAE found")
            x = (images.shape[1] // 8) * 8
            y = (images.shape[2] // 8) * 8
            mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])),
                                                   size=(images.shape[1], images.shape[2]), mode="bilinear")

            pixels = images.clone()
            if pixels.shape[1] != x or pixels.shape[2] != y:
                x_offset = (pixels.shape[1] % 8) // 2
                y_offset = (pixels.shape[2] % 8) // 2
                pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
                mask = mask[:, :, x_offset:x + x_offset, y_offset:y + y_offset]

            mask_erosion = mask

            m = (1.0 - mask.round()).squeeze(1)
            for i in range(3):
                pixels[:, :, :, i] -= 0.5
                pixels[:, :, :, i] *= m
                pixels[:, :, :, i] += 0.5
            t = vae.encode(pixels)

            latent = {"samples": t, "noise_mask": (mask_erosion[:, :, :x, :y].round())}
        # when patch was linked
        # if patch is not None:
        #     worker = InpaintWorker(node_name="easy kSamplerInpainting")
        #     model, = worker.patch(model, latent, patch)

        loader_settings = pipe["loader_settings"] if "loader_settings" in pipe else {}

        new_pipe = {
            "images": images,
            "model": model,
            "clip": clip,
            "vae": vae,
            "positive": positive,
            "negative": negative,
            "seed": seed,
            "mask": mask,

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
                "crop_factor": crop_factor,
                "drop_size": drop_size,
                "refiner_ratio": refiner_ratio,
                "batch_size": batch_size,
                "cycle": cycle
            },

            "mask_settings": {
                "mask_mode": mask_mode,
                "inpaint_model": inpaint_model,
                "noise_mask_feather": noise_mask_feather
            }
        }

        del pipe

        return (new_pipe,)

```
