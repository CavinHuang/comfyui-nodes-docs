---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Ultimate SD Upscale (No Upscale)
## Documentation
- Class name: `UltimateSDUpscaleNoUpscale`
- Category: `image/upscaling`
- Output node: `False`

This node is designed to integrate with the Ultimate SD Upscale system, processing images through the Ultimate SD Upscale pipeline with existing configurations and settings. It focuses on preparing images for upscaling, applying specific image enhancements, and conditioning without altering the original image sizes, effectively bypassing the upscaling step.
## Input types
### Required
- **`upscaled_image`**
    - The input image to be processed, which will not be upscaled but may undergo other processing steps.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model`**
    - The model used for processing the image, influencing the outcome based on its trained parameters.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`positive`**
    - Positive prompts guide the image processing towards desired attributes or themes, influencing the outcome in a positive manner.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative prompts serve to steer the image processing away from certain attributes or themes, thereby shaping the final image by exclusion.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`vae`**
    - The variational autoencoder used in the processing pipeline, contributing to the image's transformation.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the processing results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to be used in the processing, affecting the depth of image manipulation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration guidance factor, influencing the strength of conditioning applied during processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the sampling method to be used in the processing, affecting the image's final appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for processing, impacting the progression of image manipulation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - The degree of denoising applied during processing, affecting the clarity and detail of the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mode_type`**
    - Defines the mode of operation for certain processing steps, influencing specific aspects of the image enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tile_width`**
    - The width of tiles used in processing, affecting the granularity of the processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_height`**
    - The height of tiles used in processing, affecting the granularity of the processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_blur`**
    - The amount of blur applied to masks during processing, affecting the smoothness of transitions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_padding`**
    - Padding added around tiles during processing, affecting the overlap and blending of processed areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seam_fix_mode`**
    - The method used for fixing seams in tiled processing, affecting the uniformity of the final image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seam_fix_denoise`**
    - The degree of denoising applied specifically for seam fixing, affecting the smoothness of seams.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seam_fix_width`**
    - The width of the area affected by seam fixing, influencing the extent of seam correction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seam_fix_mask_blur`**
    - The amount of blur applied to the seam fix mask, affecting the smoothness of seam corrections.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seam_fix_padding`**
    - Padding added around the seam fix area, affecting the blending of corrected seams.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_uniform_tiles`**
    - A flag indicating whether to force uniform tile sizes during processing, affecting the consistency of processing across the image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tiled_decode`**
    - Indicates whether decoding is performed in a tiled manner, affecting the method of image reconstruction.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the processed image, which has undergone enhancements and conditioning as per the specified inputs but retains its original size.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [ImageInvert](../../Comfy/Nodes/ImageInvert.md)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
