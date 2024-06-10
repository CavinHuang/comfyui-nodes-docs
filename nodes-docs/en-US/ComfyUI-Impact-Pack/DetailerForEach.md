---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# Detailer (SEGS)
## Documentation
- Class name: `DetailerForEach`
- Category: `ImpactPack/Detailer`
- Output node: `False`

The DetailerForEach node is designed to iterate over a collection of items, applying a detailed analysis or transformation to each item individually. This process enhances the granularity of the analysis or transformation, ensuring that each item is processed with a focus on its specific characteristics or requirements.
## Input types
### Required
- **`image`**
    - The 'image' input type is essential for operations that involve visual data, allowing the node to apply transformations or analyses directly to images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`segs`**
    - unknown
    - Comfy dtype: `SEGS`
    - Python dtype: `unknown`
- **`model`**
    - The 'model' input type specifies the computational model used for processing, which is crucial for defining the behavior and capabilities of the node.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The 'clip' input type is used for operations that involve CLIP models, enabling the node to leverage textual or visual embeddings for analysis or transformation.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - The 'vae' input type indicates the use of a Variational Autoencoder, important for tasks involving latent space manipulations or generative processes.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
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
    - The 'positive' input type represents conditioning information with a positive connotation, influencing the direction of the transformation or analysis.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`negative`**
    - The 'negative' input type signifies conditioning information with a negative connotation, affecting the node's processing to account for undesired aspects.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
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
- **`wildcard`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`cycle`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
### Optional
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
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output type provides the transformed or analyzed images, reflecting the changes or insights gained through the node's processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - Reroute
    - [CR Image Output](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Output.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [ReroutePrimitive|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ReroutePrimitive|pysssss.md)



## Source code
```python
class DetailerForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "image": ("IMAGE", ),
                    "segs": ("SEGS", ),
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
                    "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),

                    "cycle": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                   },
                "optional": {
                    "detailer_hook": ("DETAILER_HOOK",),
                    "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                   }
                }

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    @staticmethod
    def do_detail(image, segs, model, clip, vae, guide_size, guide_size_for_bbox, max_size, seed, steps, cfg, sampler_name, scheduler,
                  positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard_opt=None, detailer_hook=None,
                  refiner_ratio=None, refiner_model=None, refiner_clip=None, refiner_positive=None, refiner_negative=None,
                  cycle=1, inpaint_model=False, noise_mask_feather=0):

        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: DetailerForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        image = image.clone()
        enhanced_alpha_list = []
        enhanced_list = []
        cropped_list = []
        cnet_pil_list = []

        segs = core.segs_scale_match(segs, image.shape)
        new_segs = []

        wildcard_concat_mode = None
        if wildcard_opt is not None:
            if wildcard_opt.startswith('[CONCAT]'):
                wildcard_concat_mode = 'concat'
                wildcard_opt = wildcard_opt[8:]
            wmode, wildcard_chooser = wildcards.process_wildcard_for_segs(wildcard_opt)
        else:
            wmode, wildcard_chooser = None, None

        if wmode in ['ASC', 'DSC']:
            if wmode == 'ASC':
                ordered_segs = sorted(segs[1], key=lambda x: (x.bbox[0], x.bbox[1]))
            else:
                ordered_segs = sorted(segs[1], key=lambda x: (x.bbox[0], x.bbox[1]), reverse=True)
        else:
            ordered_segs = segs[1]

        for i, seg in enumerate(ordered_segs):
            cropped_image = crop_ndarray4(image.numpy(), seg.crop_region)  # Never use seg.cropped_image to handle overlapping area
            cropped_image = to_tensor(cropped_image)
            mask = to_tensor(seg.cropped_mask)
            mask = tensor_gaussian_blur_mask(mask, feather)

            is_mask_all_zeros = (seg.cropped_mask == 0).all().item()
            if is_mask_all_zeros:
                print(f"Detailer: segment skip [empty mask]")
                continue

            if noise_mask:
                cropped_mask = seg.cropped_mask
            else:
                cropped_mask = None

            if wildcard_chooser is not None and wmode != "LAB":
                seg_seed, wildcard_item = wildcard_chooser.get(seg)
            elif wildcard_chooser is not None and wmode == "LAB":
                seg_seed, wildcard_item = None, wildcard_chooser.get(seg)
            else:
                seg_seed, wildcard_item = None, None

            seg_seed = seed + i if seg_seed is None else seg_seed

            cropped_positive = [
                [condition, {
                    k: core.crop_condition_mask(v, image, seg.crop_region) if k == "mask" else v
                    for k, v in details.items()
                }]
                for condition, details in positive
            ]

            cropped_negative = [
                [condition, {
                    k: core.crop_condition_mask(v, image, seg.crop_region) if k == "mask" else v
                    for k, v in details.items()
                }]
                for condition, details in negative
            ]

            enhanced_image, cnet_pils = core.enhance_detail(cropped_image, model, clip, vae, guide_size, guide_size_for_bbox, max_size,
                                                            seg.bbox, seg_seed, steps, cfg, sampler_name, scheduler,
                                                            cropped_positive, cropped_negative, denoise, cropped_mask, force_inpaint,
                                                            wildcard_opt=wildcard_item, wildcard_opt_concat_mode=wildcard_concat_mode,
                                                            detailer_hook=detailer_hook,
                                                            refiner_ratio=refiner_ratio, refiner_model=refiner_model,
                                                            refiner_clip=refiner_clip, refiner_positive=refiner_positive,
                                                            refiner_negative=refiner_negative, control_net_wrapper=seg.control_net_wrapper,
                                                            cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)

            if cnet_pils is not None:
                cnet_pil_list.extend(cnet_pils)

            if not (enhanced_image is None):
                # don't latent composite-> converting to latent caused poor quality
                # use image paste
                image = image.cpu()
                enhanced_image = enhanced_image.cpu()
                tensor_paste(image, enhanced_image, (seg.crop_region[0], seg.crop_region[1]), mask)
                enhanced_list.append(enhanced_image)

                if detailer_hook is not None:
                    detailer_hook.post_paste(image)

            if not (enhanced_image is None):
                # Convert enhanced_pil_alpha to RGBA mode
                enhanced_image_alpha = tensor_convert_rgba(enhanced_image)
                new_seg_image = enhanced_image.numpy()  # alpha should not be applied to seg_image

                # Apply the mask
                mask = tensor_resize(mask, *tensor_get_size(enhanced_image))
                tensor_putalpha(enhanced_image_alpha, mask)
                enhanced_alpha_list.append(enhanced_image_alpha)
            else:
                new_seg_image = None

            cropped_list.append(cropped_image)

            new_seg = SEG(new_seg_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
            new_segs.append(new_seg)

        image_tensor = tensor_convert_rgb(image)

        cropped_list.sort(key=lambda x: x.shape, reverse=True)
        enhanced_list.sort(key=lambda x: x.shape, reverse=True)
        enhanced_alpha_list.sort(key=lambda x: x.shape, reverse=True)

        return image_tensor, cropped_list, enhanced_list, enhanced_alpha_list, cnet_pil_list, (segs[0], new_segs)

    def doit(self, image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name,
             scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard, cycle=1,
             detailer_hook=None, inpaint_model=False, noise_mask_feather=0):

        enhanced_img, *_ = \
            DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps,
                                      cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask,
                                      force_inpaint, wildcard, detailer_hook,
                                      cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)

        return (enhanced_img, )

```
