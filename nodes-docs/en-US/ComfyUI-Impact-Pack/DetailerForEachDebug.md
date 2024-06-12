---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# DetailerDebug (SEGS)
## Documentation
- Class name: `DetailerForEachDebug`
- Category: `ImpactPack/Detailer`
- Output node: `False`

The DetailerForEachDebug node is a specialized version of the DetailerForEach node, designed for debugging purposes. It extends the functionality of DetailerForEach by incorporating additional diagnostic features to aid in the analysis and troubleshooting of the detailing process.
## Input types
### Required
- **`image`**
    - The 'image' input type represents the visual content that the node processes, serving as the primary subject for detailing. It is essential for the node's operation, directly influencing the detailing outcomes.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`segs`**
    - The 'segs' input type refers to segmentation maps associated with the image, providing contextual information for more precise detailing. It plays a crucial role in guiding the detailing process.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[torch.Tensor]`
- **`model`**
    - The 'model' input type specifies the generative model used for detailing, affecting the style and quality of the detailing outcomes.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`guide_size`**
    - The 'guide_size' input type determines the resolution of the guide for detailing, impacting the detail level and overall quality of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`guide_size_for`**
    - The 'guide_size_for' input type indicates whether the guide size is determined by the bounding box or the crop region, influencing the detailing scope.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`max_size`**
    - The 'max_size' input type sets the maximum resolution for the output, ensuring the detailing process stays within computational limits.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - The 'seed' input type provides a way to reproduce detailing results by initializing the random number generator with a specific value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The 'steps' input type specifies the number of steps to perform in the detailing process, affecting the thoroughness and quality of the detailing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The 'cfg' input type controls the configuration of the generative model during detailing, affecting the style and characteristics of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The 'sampler_name' input type selects the sampling method used in the detailing process, influencing the randomness and diversity of the detailing outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The 'scheduler' input type determines the scheduling strategy for the detailing steps, affecting the progression and refinement of the detailing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - The 'positive' input type represents conditioning information that encourages certain features or aspects in the detailing outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`negative`**
    - The 'negative' input type represents conditioning information that discourages certain features or aspects in the detailing outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`denoise`**
    - The 'denoise' input type specifies the level of denoising applied during the detailing process, affecting the clarity and smoothness of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`feather`**
    - The 'feather' input type controls the feathering of edges in the detailing, affecting the blending and naturalness of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_mask`**
    - The 'noise_mask' input type indicates whether a noise mask is applied during detailing, influencing the texture and detail distribution in the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`force_inpaint`**
    - The 'force_inpaint' input type determines whether inpainting is enforced in areas lacking detail, affecting the completeness and coherence of the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`wildcard`**
    - The 'wildcard' input type allows for the inclusion of additional, unspecified parameters that may influence the detailing process in unforeseen ways.
    - Comfy dtype: `STRING`
    - Python dtype: `Any`
- **`cycle`**
    - The 'cycle' input type specifies whether the detailing process includes a cycle of operations for refinement, affecting the iterative improvement of the output.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
### Optional
- **`detailer_hook`**
    - The 'detailer_hook' input type provides a mechanism for custom modifications or enhancements during the detailing process, allowing for tailored detailing outcomes.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `Callable`
- **`inpaint_model`**
    - The 'inpaint_model' input type indicates whether an inpainting model is used for filling in missing details, affecting the restoration and enhancement of the image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_mask_feather`**
    - The 'noise_mask_feather' input type controls the feathering of the noise mask, affecting the smoothness and transition of details in the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output type represents the detailed and enhanced visual content produced by the node, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`cropped`**
    - Comfy dtype: `IMAGE`
    - The 'cropped' output type refers to the portion of the image that has been selected and processed for detailing, providing a focused area of enhancement.
    - Python dtype: `torch.Tensor`
- **`cropped_refined`**
    - Comfy dtype: `IMAGE`
    - The 'cropped_refined' output type represents the refined version of the cropped image, showcasing the improvements made during the detailing process.
    - Python dtype: `torch.Tensor`
- **`cropped_refined_alpha`**
    - Comfy dtype: `IMAGE`
    - The 'cropped_refined_alpha' output type includes the alpha channel of the cropped and refined image, allowing for transparency handling in further processing.
    - Python dtype: `torch.Tensor`
- **`cnet_images`**
    - Comfy dtype: `IMAGE`
    - The 'cnet_images' output type consists of images processed through a ControlNet model, offering additional refinement and detailing based on model predictions.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [DetailerForEachDebug](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebug.md)



## Source code
```python
class DetailerForEachTest(DetailerForEach):
    RETURN_TYPES = ("IMAGE", "IMAGE", "IMAGE", "IMAGE", "IMAGE")
    RETURN_NAMES = ("image", "cropped", "cropped_refined", "cropped_refined_alpha", "cnet_images")
    OUTPUT_IS_LIST = (False, True, True, True, True)

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name,
             scheduler, positive, negative, denoise, feather, noise_mask, force_inpaint, wildcard, detailer_hook=None,
             cycle=1, inpaint_model=False, noise_mask_feather=0):

        if len(image) > 1:
            raise Exception('[Impact Pack] ERROR: DetailerForEach does not allow image batches.\nPlease refer to https://github.com/ltdrdata/ComfyUI-extension-tutorials/blob/Main/ComfyUI-Impact-Pack/tutorial/batching-detailer.md for more information.')

        enhanced_img, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list, new_segs = \
            DetailerForEach.do_detail(image, segs, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps,
                                      cfg, sampler_name, scheduler, positive, negative, denoise, feather, noise_mask,
                                      force_inpaint, wildcard, detailer_hook,
                                      cycle=cycle, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)

        # set fallback image
        if len(cropped) == 0:
            cropped = [empty_pil_tensor()]

        if len(cropped_enhanced) == 0:
            cropped_enhanced = [empty_pil_tensor()]

        if len(cropped_enhanced_alpha) == 0:
            cropped_enhanced_alpha = [empty_pil_tensor()]

        if len(cnet_pil_list) == 0:
            cnet_pil_list = [empty_pil_tensor()]

        return enhanced_img, cropped, cropped_enhanced, cropped_enhanced_alpha, cnet_pil_list

```
