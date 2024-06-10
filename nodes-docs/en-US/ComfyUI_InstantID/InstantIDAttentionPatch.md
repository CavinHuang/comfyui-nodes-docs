---
tags:
- ModelGuidance
- ModelPatch
---

# InstantID Patch Attention
## Documentation
- Class name: `InstantIDAttentionPatch`
- Category: `InstantID`
- Output node: `False`

The InstantIDAttentionPatch node is designed to modify the attention mechanisms within a given model to enhance its capability to focus on specific features or areas of interest. This patching process aims to improve the model's performance by adjusting its attention layers according to custom specifications.
## Input types
### Required
- **`instantid`**
    - The model instance to which the attention patch will be applied, enhancing its focus capabilities.
    - Comfy dtype: `INSTANTID`
    - Python dtype: `object`
- **`insightface`**
    - A pre-trained model used for face detection and feature extraction, providing critical input for the attention patching process.
    - Comfy dtype: `FACEANALYSIS`
    - Python dtype: `object`
- **`image`**
    - The input image on which face detection and feature extraction are performed, serving as a basis for attention modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`model`**
    - The specific model within which the attention mechanisms are to be patched, targeting its layers for enhancement.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`weight`**
    - The weight parameter influences the degree of attention modification, allowing for fine-tuning of the patch's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_at`**
    - Specifies the starting point within the model's layers for applying the attention patch, dictating the scope of modification.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_at`**
    - Defines the endpoint within the model's layers for the attention patch application, marking the boundary of the patching process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`noise`**
    - An optional parameter that introduces randomness into the patching process, potentially enhancing model robustness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`mask`**
    - An optional mask that can be applied during the patching process to focus the attention modification on specific areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with enhanced attention mechanisms, reflecting the applied patches.
    - Python dtype: `object`
- **`face_embeds`**
    - Comfy dtype: `FACE_EMBEDS`
    - The extracted facial embeddings from the input image, used as part of the attention patching process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InstantIDAttentionPatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "instantid": ("INSTANTID", ),
                "insightface": ("FACEANALYSIS", ),
                "image": ("IMAGE", ),
                "model": ("MODEL", ),
                "weight": ("FLOAT", {"default": 1.0, "min": -1.0, "max": 3.0, "step": 0.01, }),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001, }),
                "noise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.1, }),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("MODEL", "FACE_EMBEDS")
    FUNCTION = "patch_attention"
    CATEGORY = "InstantID"

    def patch_attention(self, instantid, insightface, image, model, weight, start_at, end_at, noise=0.0, mask=None):
        self.dtype = torch.float16 if comfy.model_management.should_use_fp16() else torch.float32
        self.device = comfy.model_management.get_torch_device()

        output_cross_attention_dim = instantid["ip_adapter"]["1.to_k_ip.weight"].shape[1]
        is_sdxl = output_cross_attention_dim == 2048
        cross_attention_dim = 1280
        clip_extra_context_tokens = 16

        face_embed = extractFeatures(insightface, image)
        if face_embed is None:
            raise Exception('Reference Image: No face detected.')

        clip_embed = face_embed
        # InstantID works better with averaged embeds (TODO: needs testing)
        if clip_embed.shape[0] > 1:
            clip_embed = torch.mean(clip_embed, dim=0).unsqueeze(0)

        if noise > 0:
            seed = int(torch.sum(clip_embed).item()) % 1000000007
            torch.manual_seed(seed)
            clip_embed_zeroed = noise * torch.rand_like(clip_embed)
        else:
            clip_embed_zeroed = torch.zeros_like(clip_embed)

        clip_embeddings_dim = face_embed.shape[-1]

        # 1: patch the attention
        self.instantid = InstantID(
            instantid,
            cross_attention_dim=cross_attention_dim,
            output_cross_attention_dim=output_cross_attention_dim,
            clip_embeddings_dim=clip_embeddings_dim,
            clip_extra_context_tokens=clip_extra_context_tokens,
        )

        self.instantid.to(self.device, dtype=self.dtype)

        image_prompt_embeds, uncond_image_prompt_embeds = self.instantid.get_image_embeds(clip_embed.to(self.device, dtype=self.dtype), clip_embed_zeroed.to(self.device, dtype=self.dtype))

        image_prompt_embeds = image_prompt_embeds.to(self.device, dtype=self.dtype)
        uncond_image_prompt_embeds = uncond_image_prompt_embeds.to(self.device, dtype=self.dtype)

        if weight == 0:
            return (model, { "cond": image_prompt_embeds, "uncond": uncond_image_prompt_embeds } )

        work_model = model.clone()

        sigma_start = model.get_model_object("model_sampling").percent_to_sigma(start_at)
        sigma_end = model.get_model_object("model_sampling").percent_to_sigma(end_at)

        if mask is not None:
            mask = mask.to(self.device)

        patch_kwargs = {
            "number": 0,
            "weight": weight,
            "ipadapter": self.instantid,
            "cond": image_prompt_embeds,
            "uncond": uncond_image_prompt_embeds,
            "mask": mask,
            "sigma_start": sigma_start,
            "sigma_end": sigma_end,
        }

        if not is_sdxl:
            for id in [1,2,4,5,7,8]: # id of input_blocks that have cross attention
                _set_model_patch_replace(work_model, patch_kwargs, ("input", id))
                patch_kwargs["number"] += 1
            for id in [3,4,5,6,7,8,9,10,11]: # id of output_blocks that have cross attention
                _set_model_patch_replace(work_model, patch_kwargs, ("output", id))
                patch_kwargs["number"] += 1
            _set_model_patch_replace(work_model, patch_kwargs, ("middle", 0))
        else:
            for id in [4,5,7,8]: # id of input_blocks that have cross attention
                block_indices = range(2) if id in [4, 5] else range(10) # transformer_depth
                for index in block_indices:
                    _set_model_patch_replace(work_model, patch_kwargs, ("input", id, index))
                    patch_kwargs["number"] += 1
            for id in range(6): # id of output_blocks that have cross attention
                block_indices = range(2) if id in [3, 4, 5] else range(10) # transformer_depth
                for index in block_indices:
                    _set_model_patch_replace(work_model, patch_kwargs, ("output", id, index))
                    patch_kwargs["number"] += 1
            for index in range(10):
                _set_model_patch_replace(work_model, patch_kwargs, ("middle", 0, index))
                patch_kwargs["number"] += 1

        return(work_model, { "cond": image_prompt_embeds, "uncond": uncond_image_prompt_embeds }, )

```
