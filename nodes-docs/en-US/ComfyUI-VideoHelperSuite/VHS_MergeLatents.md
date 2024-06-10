---
tags:
- Latent
- LatentBatch
---

# Merge Latent Batches 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_MergeLatents`
- Category: `Video Helper Suite 🎥🅥🅗🅢/latent`
- Output node: `False`

The VHS_MergeLatents node is designed for combining two sets of latents into a single set, applying various strategies for handling differences in dimensions and ensuring the merged set is suitable for further processing or generation tasks. It incorporates scaling and cropping methods to align the latents' dimensions before merging, making it a versatile tool in the manipulation and preparation of latent representations.
## Input types
### Required
- **`latents_A`**
    - The first set of latents to be merged. It plays a crucial role in the merging process, potentially serving as the template for dimension matching and scaling.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`latents_B`**
    - The second set of latents to be merged. Depending on the merge strategy, it may be scaled to match the dimensions of the first set before merging.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`merge_strategy`**
    - Determines how the dimensions of the two latent sets are matched before merging, allowing for flexible handling of varying sizes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_method`**
    - Specifies the method used for scaling latents to match dimensions, offering options like nearest-exact, bilinear, and bicubic among others.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - Defines the cropping method to be applied after scaling, if necessary, to ensure the dimensions are exactly aligned.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The merged set of latents, ready for further processing or generation tasks.
    - Python dtype: `dict`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of latents in the merged set, providing a quick reference to the size of the output.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MergeLatents:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "latents_A": ("LATENT",),
                "latents_B": ("LATENT",),
                "merge_strategy": (MergeStrategies.list_all,),
                "scale_method": (ScaleMethods.list_all,),
                "crop": (CropMethods.list_all,),
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/latent"

    RETURN_TYPES = ("LATENT", "INT",)
    RETURN_NAMES = ("LATENT", "count",)
    FUNCTION = "merge"

    def merge(self, latents_A: dict, latents_B: dict, merge_strategy: str, scale_method: str, crop: str):
        latents = []
        latents_A = latents_A.copy()["samples"]
        latents_B = latents_B.copy()["samples"]

        # if not same dimensions, do scaling
        if latents_A.shape[3] != latents_B.shape[3] or latents_A.shape[2] != latents_B.shape[2]:
            A_size = latents_A.shape[3] * latents_A.shape[2]
            B_size = latents_B.shape[3] * latents_B.shape[2]
            # determine which to use
            use_A_as_template = True
            if merge_strategy == MergeStrategies.MATCH_A:
                pass
            elif merge_strategy == MergeStrategies.MATCH_B:
                use_A_as_template = False
            elif merge_strategy in (MergeStrategies.MATCH_SMALLER, MergeStrategies.MATCH_LARGER):
                if A_size <= B_size:
                    use_A_as_template = True if merge_strategy == MergeStrategies.MATCH_SMALLER else False
            # apply scaling
            if use_A_as_template:
                latents_B = comfy.utils.common_upscale(latents_B, latents_A.shape[3], latents_A.shape[2], scale_method, crop)
            else:
                latents_A = comfy.utils.common_upscale(latents_A, latents_B.shape[3], latents_B.shape[2], scale_method, crop)

        latents.append(latents_A)
        latents.append(latents_B)

        merged = {"samples": torch.cat(latents, dim=0)}
        return (merged, len(merged["samples"]),)

```
