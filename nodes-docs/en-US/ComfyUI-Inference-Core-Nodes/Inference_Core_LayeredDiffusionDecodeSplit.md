---
tags:
- LayeredDiffusion
- LayeredDiffusionDecode
---

# [Inference.Core] Layer Diffuse Decode (Split)
## Documentation
- Class name: `Inference_Core_LayeredDiffusionDecodeSplit`
- Category: `layer_diffuse`
- Output node: `False`

This node specializes in decoding images through a layered diffusion process, specifically tailored for handling split image data. It leverages a modified diffusion decode method to process images in segments, optimizing for scenarios where images are divided into frames or layers for enhanced inference performance.
## Input types
### Required
- **`samples`**
    - A collection of sample data that the node will process. This data is crucial for the decoding operation, as it directly influences the segmentation, processing, and final quality of the decoded images.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`images`**
    - The tensor of images to be decoded. This input is central to the node's functionality, as it directly manipulates these images based on the provided samples and frames.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`frames`**
    - Specifies the number of frames or segments into which the images are divided. This parameter is key to determining how the images are processed and decoded.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sd_version`**
    - The version of the Stable Diffusion model to use for decoding. This affects the decoding behavior and the quality of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sub_batch_size`**
    - The size of sub-batches for processing, allowing for optimized resource utilization during the decoding process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The decoded images, processed through the layered diffusion method. This output is crucial for understanding the effectiveness and quality of the decoding process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionDecodeSplit(LayeredDiffusionDecodeRGBA):
    """Decode RGBA every N images."""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "samples": ("LATENT",),
                "images": ("IMAGE",),
                # Do RGBA decode every N output images.
                "frames": (
                    "INT",
                    {"default": 2, "min": 2, "max": s.MAX_FRAMES, "step": 1},
                ),
                "sd_version": (
                    [
                        StableDiffusionVersion.SD1x.value,
                        StableDiffusionVersion.SDXL.value,
                    ],
                    {
                        "default": StableDiffusionVersion.SDXL.value,
                    },
                ),
                "sub_batch_size": (
                    "INT",
                    {"default": 16, "min": 1, "max": 4096, "step": 1},
                ),
            },
        }

    MAX_FRAMES = 3
    RETURN_TYPES = ("IMAGE",) * MAX_FRAMES

    def decode(
        self,
        samples,
        images: torch.Tensor,
        frames: int,
        sd_version: str,
        sub_batch_size: int,
    ):
        sliced_samples = copy.copy(samples)
        sliced_samples["samples"] = sliced_samples["samples"][::frames]
        return tuple(
            (
                (
                    super(LayeredDiffusionDecodeSplit, self).decode(
                        sliced_samples, imgs, sd_version, sub_batch_size
                    )[0]
                    if i == 0
                    else imgs
                )
                for i in range(frames)
                for imgs in (images[i::frames],)
            )
        ) + (None,) * (self.MAX_FRAMES - frames)

```
