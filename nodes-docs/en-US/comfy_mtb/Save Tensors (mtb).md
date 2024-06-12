---
tags:
- Image
- ImageSave
---

# Save Tensors (mtb)
## Documentation
- Class name: `Save Tensors (mtb)`
- Category: `mtb/debug`
- Output node: `True`

The Save Tensors node is designed for saving torch tensors, such as images, masks, or latent representations, to disk. This functionality is particularly useful for debugging purposes outside of the Comfy environment, allowing for the inspection and analysis of tensor data generated within custom workflows.
## Input types
### Required
- **`filename_prefix`**
    - Specifies the prefix for the filename under which the tensor will be saved. This parameter helps in organizing and identifying saved tensors for debugging purposes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image`**
    - An optional image tensor that can be saved to disk. This allows for the storage and later inspection of image data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - An optional mask tensor that can be saved to disk. Useful for debugging and analyzing mask data applied in image processing.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`latent`**
    - An optional latent tensor that can be saved to disk. Facilitates the debugging and examination of latent representations in models.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_SaveTensors:
    """Save torch tensors (image, mask or latent) to disk.

    useful to debug things outside comfy.
    """

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "mtb/debug"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "filename_prefix": ("STRING", {"default": "ComfyPickle"}),
            },
            "optional": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "latent": ("LATENT",),
            },
        }

    FUNCTION = "save"
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    CATEGORY = "mtb/debug"

    def save(
        self,
        filename_prefix,
        image: Optional[torch.Tensor] = None,
        mask: Optional[torch.Tensor] = None,
        latent: Optional[torch.Tensor] = None,
    ):
        (
            full_output_folder,
            filename,
            counter,
            subfolder,
            filename_prefix,
        ) = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        full_output_folder = Path(full_output_folder)
        if image is not None:
            image_file = f"{filename}_image_{counter:05}.pt"
            torch.save(image, full_output_folder / image_file)
            # np.save(full_output_folder/ image_file, image.cpu().numpy())

        if mask is not None:
            mask_file = f"{filename}_mask_{counter:05}.pt"
            torch.save(mask, full_output_folder / mask_file)
            # np.save(full_output_folder/ mask_file, mask.cpu().numpy())

        if latent is not None:
            # for latent we must use pickle
            latent_file = f"{filename}_latent_{counter:05}.pt"
            torch.save(latent, full_output_folder / latent_file)
            # pickle.dump(latent, open(full_output_folder/ latent_file, "wb"))

            # np.save(full_output_folder / latent_file,
            # latent[""].cpu().numpy())

        return f"{filename_prefix}_{counter:05}"

```
