---
tags:
- Batch
- Image
---

# Batch Time Wrap (mtb)
## Documentation
- Class name: `Batch Time Wrap (mtb)`
- Category: `mtb/batch`
- Output node: `False`

The Batch Time Wrap (mtb) node is designed to remap a batch of images according to a specified time curve, effectively allowing for the dynamic adjustment of image sequences based on temporal data.
## Input types
### Required
- **`target_count`**
    - Specifies the desired number of images in the output batch, allowing for dynamic adjustment of the batch size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frames`**
    - The input batch of images to be remapped according to the time curve.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`curve`**
    - A sequence of floating-point values defining the time curve along which the input images are remapped.
    - Comfy dtype: `FLOATS`
    - Python dtype: `List[float]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output batch of images that have been remapped according to the specified time curve.
    - Python dtype: `List[Image]`
- **`interpolated_floats`**
    - Comfy dtype: `FLOATS`
    - A sequence of floating-point values representing the interpolated positions of the input images along the time curve.
    - Python dtype: `List[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchTimeWrap:
    """Remap a batch using a time curve (FLOATS)"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_count": ("INT", {"default": 25, "min": 2}),
                "frames": ("IMAGE",),
                "curve": ("FLOATS",),
            },
        }

    RETURN_TYPES = ("IMAGE", "FLOATS")
    RETURN_NAMES = ("image", "interpolated_floats")
    CATEGORY = "mtb/batch"
    FUNCTION = "execute"

    def execute(
        self, target_count: int, frames: torch.Tensor, curve: list[float]
    ):
        """Apply time warping to a list of video frames based on a curve."""
        log.debug(f"Input frames shape: {frames.shape}")
        log.debug(f"Curve: {curve}")

        total_duration = sum(curve)

        log.debug(f"Total duration: {total_duration}")

        B, H, W, C = frames.shape

        log.debug(f"Batch Size: {B}")

        normalized_times = np.linspace(0, 1, target_count)
        interpolated_curve = np.interp(
            normalized_times, np.linspace(0, 1, len(curve)), curve
        ).tolist()
        log.debug(f"Interpolated curve: {interpolated_curve}")

        interpolated_frame_indices = [
            (B - 1) * value for value in interpolated_curve
        ]
        log.debug(f"Interpolated frame indices: {interpolated_frame_indices}")

        rounded_indices = [
            int(round(idx)) for idx in interpolated_frame_indices
        ]
        rounded_indices = np.clip(rounded_indices, 0, B - 1)

        # Gather frames based on interpolated indices
        warped_frames = []
        for index in rounded_indices:
            warped_frames.append(frames[index].unsqueeze(0))

        warped_tensor = torch.cat(warped_frames, dim=0)
        log.debug(f"Warped frames shape: {warped_tensor.shape}")
        return (warped_tensor, interpolated_curve)

```
