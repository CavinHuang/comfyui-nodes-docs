---
tags:
- Image
---

# Preview Chooser Fabric
## Documentation
- Class name: `Preview Chooser Fabric`
- Category: `image_chooser`
- Output node: `False`

This node extends the functionality of image selection by allowing users to preview and choose between images based on their latent representations. It supports advanced selection mechanisms, including the ability to differentiate between positive and negative selections within a batch of images, thereby facilitating more nuanced decision-making processes in workflows that involve image analysis and manipulation.
## Input types
### Required
- **`images`**
    - The images parameter is crucial for providing the visual content that users will preview and select from. It directly influences the node's ability to render previews and capture user choices.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`latents`**
    - The latents parameter represents the latent representations of the images provided. It is essential for the node to perform operations on the images based on their underlying characteristics, enabling more sophisticated selection criteria.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
## Output types
- **`positive`**
    - Comfy dtype: `LATENT`
    - The positive output represents the selected images or latents deemed favorable by the user, enabling downstream processes to utilize these preferred choices.
    - Python dtype: `torch.Tensor`
- **`negative`**
    - Comfy dtype: `LATENT`
    - The negative output contrasts with the positive by representing the selections marked as unfavorable, allowing for the exclusion or alternative handling of these choices in subsequent operations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PreviewAndChooseDouble(PreviewAndChoose):
    RETURN_TYPES = ("LATENT","LATENT",)
    RETURN_NAMES = ("positive","negative",)
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ), 
                "latents": ("LATENT", ),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "id":"UNIQUE_ID"},
        } 

    def batch_up_selections(self, images_in, latent_samples_in, masks_in, selections:list, mode):
        divider = selections.index(-1)
        latents_out_good = self.latent_bundle(latent_samples_in, selections[:divider])
        latents_out_bad = self.latent_bundle(latent_samples_in, selections[divider+1:])
        return (latents_out_good, latents_out_bad,)

```
