---
tags:
- LayeredDiffusion
- LayeredDiffusionDecode
---

# Layer Diffuse Decode (Split)
## Documentation
- Class name: `LayeredDiffusionDecodeSplit`
- Category: `layer_diffuse`
- Output node: `False`

The LayeredDiffusionDecodeSplit node is designed for the specialized task of decoding images in a layered diffusion process, specifically handling split layers. It modifies the sampling process to accommodate different frame rates or sequences, ensuring that each layer is processed appropriately for temporal consistency and visual quality.
## Input types
### Required
- **`samples`**
    - A collection of sample data that the node will process, typically representing different states or stages in the diffusion process. This input is crucial for determining how the images are decoded and split across frames.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, Any]`
- **`images`**
    - A tensor of images that are to be decoded and potentially modified by the node. This input is essential for applying the layered diffusion decoding process to each image in the sequence.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`frames`**
    - The number of frames to be processed, affecting how the samples are sliced and how images are decoded across the sequence. This parameter plays a key role in temporal segmentation of the diffusion process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sd_version`**
    - Specifies the version of the stable diffusion model to be used, impacting the decoding behavior and the quality of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sub_batch_size`**
    - Determines the size of sub-batches for processing, influencing the efficiency and speed of the decoding operation. This parameter is important for managing computational resources.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the node, consisting of decoded images that have been processed through the layered diffusion technique. This includes modifications for split layers and adjustments for frame rates.
    - Python dtype: `Tuple[torch.Tensor, NoneType]`
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
