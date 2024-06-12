---
tags:
- Image
- Pipeline
---

# Pipe Edit
## Documentation
- Class name: `easy pipeEdit`
- Category: `EasyUse/Pipe`
- Output node: `False`

The `pipeEdit` node is designed to modify and enhance the pipeline configuration for generative tasks, allowing for the dynamic adjustment of parameters such as model settings, conditioning inputs, and other generative components. It serves as a utility to refine and adapt the pipeline based on specific requirements or to incorporate new information.
## Input types
### Required
- **`clip_skip`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`optional_positive`**
    - An optional parameter for specifying additional positive conditioning, which can be used to further guide the generative model towards desired outcomes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive_token_normalization`**
    - Determines the method for normalizing positive tokens, affecting how the model interprets and weights positive conditioning inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive_weight_interpretation`**
    - Specifies how the weight of positive conditioning inputs is interpreted, influencing the model's focus on these inputs during generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`optional_negative`**
    - An optional parameter for specifying additional negative conditioning, which can be used to steer the generative model away from undesired outcomes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_token_normalization`**
    - Determines the method for normalizing negative tokens, affecting how the model interprets and weights negative conditioning inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_weight_interpretation`**
    - Specifies how the weight of negative conditioning inputs is interpreted, influencing the model's avoidance of these inputs during generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a1111_prompt_style`**
    - Indicates whether the A1111 prompt style is used, which can affect the interpretation and processing of conditioning inputs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
- **`conditioning_mode`**
    - Specifies the mode of conditioning, which can alter how positive and negative conditioning inputs are combined and applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`average_strength`**
    - Defines the average strength of conditioning, impacting the overall influence of conditioning inputs on the generative process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`old_cond_start`**
    - The starting point for the original conditioning range, used in adjusting the influence of conditioning inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`old_cond_end`**
    - The ending point for the original conditioning range, used in adjusting the influence of conditioning inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`new_cond_start`**
    - The starting point for the new conditioning range, allowing for the adjustment of conditioning input influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`new_cond_end`**
    - The ending point for the new conditioning range, allowing for the adjustment of conditioning input influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`pipe`**
    - Represents the current state of the pipeline, encapsulating all relevant settings and parameters that define the generative process. It is crucial for determining the modifications to be applied.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`pos`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`neg`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`latent`**
    - unknown
    - Comfy dtype: `LATENT`
    - Python dtype: `unknown`
- **`vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`image`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified pipeline configuration, reflecting the applied edits and enhancements to accommodate the specified adjustments or new settings.
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - The selected or modified generative model within the new pipeline configuration.
    - Python dtype: `str`
- **`pos`**
    - Comfy dtype: `CONDITIONING`
    - Positive conditioning parameters or text in the updated pipeline, guiding towards desired generative outcomes.
    - Python dtype: `str`
- **`neg`**
    - Comfy dtype: `CONDITIONING`
    - Negative conditioning parameters or text in the updated pipeline, used to avoid undesired generative outcomes.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Settings or parameters related to the latent space manipulation in the new pipeline configuration.
    - Python dtype: `str`
- **`vae`**
    - Comfy dtype: `VAE`
    - VAE settings in the updated pipeline, if applicable, for image or text generation.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - CLIP model parameters in the new pipeline configuration for enhanced content alignment.
    - Python dtype: `str`
- **`image`**
    - Comfy dtype: `IMAGE`
    - Images specified for use or generation within the new pipeline configuration.
    - Python dtype: `List[Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class pipeEdit:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
             "required": {
                 "clip_skip": ("INT", {"default": -1, "min": -24, "max": 0, "step": 1}),

                 "optional_positive": ("STRING", {"default": "", "multiline": True}),
                 "positive_token_normalization": (["none", "mean", "length", "length+mean"],),
                 "positive_weight_interpretation": (["comfy", "A1111", "comfy++", "compel", "fixed attention"],),

                 "optional_negative": ("STRING", {"default": "", "multiline": True}),
                 "negative_token_normalization": (["none", "mean", "length", "length+mean"],),
                 "negative_weight_interpretation": (["comfy", "A1111", "comfy++", "compel", "fixed attention"],),

                 "a1111_prompt_style": ("BOOLEAN", {"default": False}),
                 "conditioning_mode": (['replace', 'concat', 'combine', 'average', 'timestep'], {"default": "replace"}),
                 "average_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                 "old_cond_start": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                 "old_cond_end": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                 "new_cond_start": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                 "new_cond_end": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
             },
             "optional": {
                "pipe": ("PIPE_LINE",),
                "model": ("MODEL",),
                "pos": ("CONDITIONING",),
                "neg": ("CONDITIONING",),
                "latent": ("LATENT",),
                "vae": ("VAE",),
                "clip": ("CLIP",),
                "image": ("IMAGE",),
             },
            "hidden": {"my_unique_id": "UNIQUE_ID", "prompt":"PROMPT"},
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE")
    RETURN_NAMES = ("pipe", "model", "pos", "neg", "latent", "vae", "clip", "image")
    FUNCTION = "flush"

    CATEGORY = "EasyUse/Pipe"

    def flush(self, clip_skip, optional_positive, positive_token_normalization, positive_weight_interpretation, optional_negative, negative_token_normalization, negative_weight_interpretation, a1111_prompt_style, conditioning_mode, average_strength, old_cond_start, old_cond_end, new_cond_start, new_cond_end, pipe=None, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, image=None, my_unique_id=None, prompt=None):

        model = model if model is not None else pipe.get("model")
        if model is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "Model missing from pipeLine")
        vae = vae if vae is not None else pipe.get("vae")
        if vae is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "VAE missing from pipeLine")
        clip = clip if clip is not None else pipe.get("clip")
        if clip is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', "Clip missing from pipeLine")
        if image is None:
            image = pipe.get("images") if pipe is not None else None
            samples = latent if latent is not None else pipe.get("samples")
            if samples is None:
                log_node_warn(f'pipeIn[{my_unique_id}]', "Latent missing from pipeLine")
        else:
            batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1
            samples = {"samples": vae.encode(image[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]

        pipe_lora_stack = pipe.get("lora_stack") if pipe is not None and "lora_stack" in pipe else []

        steps = pipe["loader_settings"]["steps"] if "steps" in pipe["loader_settings"] else 1
        if pos is None and optional_positive != '':
            pos, positive_wildcard_prompt, model, clip = prompt_to_cond('positive', model, clip, clip_skip,
                                                                        pipe_lora_stack, optional_positive, positive_token_normalization,positive_weight_interpretation,
                                                                        a1111_prompt_style, my_unique_id, prompt, easyCache, True, steps)
            pos = set_cond(pipe['positive'], pos, conditioning_mode, average_strength, old_cond_start, old_cond_end, new_cond_start, new_cond_end)
            pipe['loader_settings']['positive'] = positive_wildcard_prompt
            pipe['loader_settings']['positive_token_normalization'] = positive_token_normalization
            pipe['loader_settings']['positive_weight_interpretation'] = positive_weight_interpretation
            if a1111_prompt_style:
                pipe['loader_settings']['a1111_prompt_style'] = True
        else:
            pos = pipe.get("positive")
            if pos is None:
                log_node_warn(f'pipeIn[{my_unique_id}]', "Pos Conditioning missing from pipeLine")

        if neg is None and optional_negative != '':
            neg, negative_wildcard_prompt, model, clip = prompt_to_cond("negative", model, clip, clip_skip, pipe_lora_stack, optional_negative,
                                                      negative_token_normalization, negative_weight_interpretation,
                                                      a1111_prompt_style, my_unique_id, prompt, easyCache, True, steps)
            neg = set_cond(pipe['negative'], neg, conditioning_mode, average_strength, old_cond_start, old_cond_end, new_cond_start, new_cond_end)
            pipe['loader_settings']['negative'] = negative_wildcard_prompt
            pipe['loader_settings']['negative_token_normalization'] = negative_token_normalization
            pipe['loader_settings']['negative_weight_interpretation'] = negative_weight_interpretation
            if a1111_prompt_style:
                pipe['loader_settings']['a1111_prompt_style'] = True
        else:
            neg = pipe.get("negative")
            if neg is None:
                log_node_warn(f'pipeIn[{my_unique_id}]', "Neg Conditioning missing from pipeLine")
        if pipe is None:
            pipe = {"loader_settings": {"positive": "", "negative": "", "xyplot": None}}

        new_pipe = {
            **pipe,
            "model": model,
            "positive": pos,
            "negative": neg,
            "vae": vae,
            "clip": clip,

            "samples": samples,
            "images": image,
            "seed": pipe.get('seed') if pipe is not None and "seed" in pipe else None,
            "loader_settings":{
                **pipe["loader_settings"]
            }
        }
        del pipe

        return (new_pipe, model,pos, neg, latent, vae, clip, image)

```
