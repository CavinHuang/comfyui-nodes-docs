---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Ultimate SD Upscale
## Documentation
- Class name: `UltimateSDUpscale`
- Category: `image/upscaling`
- Output node: `False`

The UltimateSDUpscale node integrates advanced upscaling techniques to enhance image resolution and quality within the ComfyUI framework, leveraging the Ultimate SD Upscale by Coyote-A. It utilizes deep learning models and custom algorithms to upscale images, apply seam fixing, and redraw images for improved visual fidelity, supporting various modes and configurations for tailored image processing.
## Input types
### Required
- **`image`**
    - The input image tensor to be upscaled. It plays a crucial role in determining the final output quality and resolution, as the node applies deep learning-based upscaling techniques to enhance the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model`**
    - The deep learning model used for processing the image. It is essential for the upscaling and enhancement process, influencing the quality of the output.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`positive`**
    - Positive conditioning text to guide the image processing, enhancing specific attributes or elements within the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative conditioning text to suppress undesired attributes or elements in the image during processing.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`vae`**
    - The variational autoencoder used for image manipulation, playing a key role in the image's quality and detail enhancement.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`upscale_by`**
    - The factor by which the image will be upscaled. This directly influences the size and detail level of the output image, enabling precise control over the upscaling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the upscaling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to perform in the upscaling process, affecting the detail and quality of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration parameter influencing the generation process, allowing for fine-tuning of the upscaling results.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler used in the processing, affecting the randomness and variation in the upscaling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler used for managing the upscaling process, contributing to the efficiency and outcome of the image enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - The denoising factor applied during upscaling, aiming to reduce noise and improve image clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_model`**
    - The specific upscaling model used, determining the technique and quality of the upscaling process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `torch.nn.Module`
- **`mode_type`**
    - Specifies the upscaling mode to be used, affecting the upscaling technique and final image appearance. This parameter allows for customization of the upscaling process to suit different image types and desired outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tile_width`**
    - The width of the tiles used in the upscaling process, affecting the granularity and detail of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_height`**
    - The height of the tiles used in the upscaling process, affecting the granularity and detail of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mask_blur`**
    - The amount of blur applied to the mask during upscaling, affecting the smoothness and blending of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_padding`**
    - The padding around each tile during upscaling, affecting the overlap and blending between tiles.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seam_fix_mode`**
    - Determines the seam fixing strategy to be applied after upscaling, aiming to improve the visual coherence of the upscaled image by addressing potential artifacts at tile boundaries.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seam_fix_denoise`**
    - The denoising factor applied specifically for seam fixing, aiming to improve the coherence and visual quality at tile boundaries.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seam_fix_width`**
    - The width of the area to apply seam fixing, affecting the extent of seam correction in the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seam_fix_mask_blur`**
    - The amount of blur applied to the seam fix mask, influencing the smoothness and blending of corrected seams.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seam_fix_padding`**
    - The padding applied during seam fixing, affecting the area of influence for seam corrections.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`force_uniform_tiles`**
    - A boolean indicating whether to force uniform tile sizes during upscaling, affecting the consistency and layout of the upscaled image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tiled_decode`**
    - A boolean indicating whether to use tiled decoding in the upscaling process, affecting the performance and possibly the quality of the upscaling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image tensor representing the upscaled image. This tensor encapsulates the enhanced resolution and quality achieved through the upscaling process, ready for further processing or display.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [PlaySound|pysssss](../../ComfyUI-Custom-Scripts/Nodes/PlaySound|pysssss.md)
    - Reroute
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - [ImageSharpen](../../Comfy/Nodes/ImageSharpen.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [PreviewBridge](../../ComfyUI-Impact-Pack/Nodes/PreviewBridge.md)
    - Fast Muter (rgthree)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
