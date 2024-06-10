---
tags:
- Batch
- Image
---

# Change Image Batch Size (Inspire)
## Documentation
- Class name: `ChangeImageBatchSize __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The ChangeImageBatchSize node is designed to adjust the batch size of an image tensor to a specified size, using a simple mode to either expand or trim the batch based on the desired count. This functionality is crucial for ensuring that image data is correctly formatted for batch processing in various image manipulation and generation tasks.
## Input types
### Required
- **`image`**
    - The image tensor to be resized. It's essential for batch processing where the batch size needs adjustment to meet specific requirements.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`batch_size`**
    - Specifies the target batch size for the image tensor, determining how the tensor will be resized.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Defines the resizing mode, currently supporting a 'simple' method for expanding or trimming the tensor.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image tensor with the adjusted batch size.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ChangeImageBatchSize:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "image": ("IMAGE",),
                                "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096, "step": 1}),
                                "mode": (["simple"],)
                            }
                }

    CATEGORY = "InspirePack/Util"

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "doit"

    @staticmethod
    def resize_tensor(input_tensor, batch_size, mode):
        if mode == "simple":
            if len(input_tensor) < batch_size:
                last_frame = input_tensor[-1].unsqueeze(0).expand(batch_size - len(input_tensor), -1, -1, -1)
                output_tensor = torch.concat((input_tensor, last_frame), dim=0)
            else:
                output_tensor = input_tensor[:batch_size, :, :, :]
            return output_tensor
        else:
            print(f"[WARN] ChangeImage(Latent)BatchSize: Unknown mode `{mode}` - ignored")
            return input_tensor

    @staticmethod
    def doit(image, batch_size, mode):
        res = ChangeImageBatchSize.resize_tensor(image, batch_size, mode)
        return (res,)

```
