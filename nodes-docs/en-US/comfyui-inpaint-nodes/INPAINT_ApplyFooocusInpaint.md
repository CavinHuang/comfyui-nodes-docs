---
tags:
- DepthMap
- Image
- Inpaint
---

# Apply Fooocus Inpaint
## Documentation
- Class name: `INPAINT_ApplyFooocusInpaint`
- Category: `inpaint`
- Output node: `False`

This node applies a specialized inpainting technique using the Fooocus method to enhance or modify images by integrating specific patches into the model's processing pipeline. It leverages a combination of model patching and latent space manipulation to achieve targeted inpainting effects, focusing on areas designated by noise masks.
## Input types
### Required
- **`model`**
    - The model to be patched with inpainting capabilities, allowing for the integration of Fooocus patches into its processing pipeline.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`patch`**
    - A tuple containing the inpaint head model and a dictionary of LoRA patches, which are applied to the base model to achieve inpainting effects.
    - Comfy dtype: `INPAINT_PATCH`
    - Python dtype: `tuple[InpaintHead, dict[str, Tensor]]`
- **`latent`**
    - A dictionary containing the latent representations and noise masks used to guide the inpainting process, influencing where and how inpainting is applied.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict[str, Any]`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model after applying the Fooocus inpainting patches, ready for further processing or generating inpainted images.
    - Python dtype: `ModelPatcher`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyFooocusInpaint:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "patch": ("INPAINT_PATCH",),
                "latent": ("LATENT",),
            }
        }

    RETURN_TYPES = ("MODEL",)
    CATEGORY = "inpaint"
    FUNCTION = "patch"

    def patch(
        self,
        model: ModelPatcher,
        patch: tuple[InpaintHead, dict[str, Tensor]],
        latent: dict[str, Any],
    ):
        base_model: BaseModel = model.model
        latent_pixels = base_model.process_latent_in(latent["samples"])
        noise_mask = latent["noise_mask"].round()

        latent_mask = F.max_pool2d(noise_mask, (8, 8)).round().to(latent_pixels)

        inpaint_head_model, inpaint_lora = patch
        feed = torch.cat([latent_mask, latent_pixels], dim=1)
        inpaint_head_model.to(device=feed.device, dtype=feed.dtype)
        inpaint_head_feature = inpaint_head_model(feed)

        def input_block_patch(h, transformer_options):
            if transformer_options["block"][1] == 0:
                h = h + inpaint_head_feature.to(h)
            return h

        lora_keys = comfy.lora.model_lora_keys_unet(model.model, {})
        lora_keys.update({x: x for x in base_model.state_dict().keys()})
        loaded_lora = load_fooocus_patch(inpaint_lora, lora_keys)

        m = model.clone()
        m.set_model_input_block_patch(input_block_patch)
        patched = m.add_patches(loaded_lora, 1.0)

        not_patched_count = sum(1 for x in loaded_lora if x not in patched)
        if not_patched_count > 0:
            print(f"[ApplyFooocusInpaint] Failed to patch {not_patched_count} keys")

        inject_patched_calculate_weight()
        return (m,)

```
