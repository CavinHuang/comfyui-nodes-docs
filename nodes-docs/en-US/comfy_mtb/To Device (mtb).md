---
tags:
- Image
- ImageTransformation
---

# To Device (mtb)
## Documentation
- Class name: `To Device (mtb)`
- Category: `mtb/utils`
- Output node: `False`

The ToDevice node is designed to transfer image or mask tensors to a specified computing device, such as CPU, GPU, or MPS (Apple Silicon), facilitating the manipulation of tensor data across different hardware platforms.
## Input types
### Required
- **`ignore_errors`**
    - Determines whether to proceed without throwing an error when both image and mask inputs are absent, allowing for flexible error handling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`device`**
    - Specifies the computing device to which the image or mask tensor will be transferred, supporting dynamic selection based on available hardware.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image`**
    - The image tensor to be transferred to the specified device, enabling hardware-specific tensor operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`mask`**
    - The mask tensor to be transferred to the specified device, similar to the image tensor, for hardware-accelerated processing.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The image tensor after being transferred to the specified device.
    - Python dtype: `Optional[torch.Tensor]`
- **`masks`**
    - Comfy dtype: `MASK`
    - The mask tensor after being transferred to the specified device.
    - Python dtype: `Optional[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_ToDevice:
    """Send a image or mask tensor to the given device."""

    @classmethod
    def INPUT_TYPES(cls):
        devices = ["cpu"]
        if torch.backends.mps.is_available():
            devices.append("mps")
        if torch.cuda.is_available():
            devices.append("cuda")
            for i in range(torch.cuda.device_count()):
                devices.append(f"cuda{i}")

        return {
            "required": {
                "ignore_errors": ("BOOLEAN", {"default": False}),
                "device": (devices, {"default": "cpu"}),
            },
            "optional": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    RETURN_NAMES = ("images", "masks")
    CATEGORY = "mtb/utils"
    FUNCTION = "to_device"

    def to_device(
        self,
        *,
        ignore_errors=False,
        device="cuda",
        image: Optional[torch.Tensor] = None,
        mask: Optional[torch.Tensor] = None,
    ):
        if not ignore_errors and image is None and mask is None:
            raise ValueError(
                "You must either provide an image or a mask,"
                " use ignore_error to passthrough"
            )
        if image is not None:
            image = image.to(device)
        if mask is not None:
            mask = mask.to(device)
        return (image, mask)

```
