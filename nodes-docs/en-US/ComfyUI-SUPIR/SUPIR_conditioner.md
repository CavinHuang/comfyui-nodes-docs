---
tags:
- Conditioning
---

# SUPIR Conditioner
## Documentation
- Class name: `SUPIR_conditioner`
- Category: `SUPIR`
- Output node: `False`

The SUPIR_conditioner node is designed to condition the input data for the SUPIR model, preparing it for further processing or generation tasks. It integrates various conditioning elements, such as positive and negative prompts, to tailor the model's output towards specific desired outcomes.
## Input types
### Required
- **`SUPIR_model`**
    - Represents the SUPIR model to which the conditioning is applied, serving as the core component for the conditioning process.
    - Comfy dtype: `SUPIRMODEL`
    - Python dtype: `SUPIRModel`
- **`latents`**
    - The latent representations of the input data, which are modified or utilized during the conditioning process to influence the model's output.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, Any]`
- **`positive_prompt`**
    - A text prompt that guides the model to generate or process data in a positive or desired direction, influencing the conditioning outcome.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - A text prompt that guides the model to avoid certain patterns or themes, acting as a counterbalance to the positive prompt in the conditioning process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`captions`**
    - Optional captions that can provide additional context or guidance for the conditioning process, further customizing the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `SUPIR_cond_pos`
    - The conditioned data tailored for positive outcomes, ready for further processing by the SUPIR model.
    - Python dtype: `Dict[str, Any]`
- **`negative`**
    - Comfy dtype: `SUPIR_cond_neg`
    - The conditioned data tailored to avoid certain patterns or themes, serving as a counterbalance in the generation process.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SUPIR_conditioner:
    # @classmethod
    # def IS_CHANGED(s):
    #     return ""
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "SUPIR_model": ("SUPIRMODEL",),
            "latents": ("LATENT",),
            "positive_prompt": ("STRING", {"multiline": True, "default": "high quality, detailed", }),
            "negative_prompt": ("STRING", {"multiline": True, "default": "bad quality, blurry, messy", }),
        },
            "optional": {
                "captions": ("STRING", {"forceInput": True, "multiline": False, "default": "", }),
            }
        }

    RETURN_TYPES = ("SUPIR_cond_pos", "SUPIR_cond_neg",)
    RETURN_NAMES = ("positive", "negative",)
    FUNCTION = "condition"
    CATEGORY = "SUPIR"
    DESCRIPTION = """
Creates the conditioning for the sampler.  
Caption input is optional, when it receives a single caption, it's added to the positive prompt.
    
If a list of caption is given for single input image, the captions need to match the number of tiles,  
refer to the SUPIR Tiles node.  
  
If a list of captions is given and it matches the incoming image batch, each image uses corresponding caption.
"""

    def condition(self, SUPIR_model, latents, positive_prompt, negative_prompt, captions=""):
        
        device = mm.get_torch_device()
        mm.soft_empty_cache()
        samples = latents["samples"]
        N, H, W, C = samples.shape
        import copy

        if not isinstance(captions, list):
            captions_list = []
            captions_list.append([captions])
            captions_list = captions_list * N
        else:
            captions_list = captions

        print("captions: ", captions_list)
      
        SUPIR_model.conditioner.to(device)
        samples = samples.to(device)

        uc = []
        pbar = comfy.utils.ProgressBar(N)
        autocast_condition = (SUPIR_model.model.dtype != torch.float32) and not comfy.model_management.is_device_mps(device)
        with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=SUPIR_model.model.dtype) if autocast_condition else nullcontext():
            if N != len(captions_list): #Tiled captioning
                print("Tiled captioning")
                c = []
                uc = []
                for i, caption in enumerate(captions_list):
                    cond = {}
                    cond['original_size_as_tuple'] = torch.tensor([[1024, 1024]]).to(device)
                    cond['crop_coords_top_left'] = torch.tensor([[0, 0]]).to(device)
                    cond['target_size_as_tuple'] = torch.tensor([[1024, 1024]]).to(device)
                    cond['aesthetic_score'] = torch.tensor([[9.0]]).to(device)
                    cond['control'] = samples[0].unsqueeze(0)

                    uncond = copy.deepcopy(cond)
                    uncond['txt'] = [negative_prompt]
                    
                    cond['txt'] = [''.join([caption[0], positive_prompt])]
                    if i == 0:
                        _c, uc = SUPIR_model.conditioner.get_unconditional_conditioning(cond, uncond)
                    else:
                        _c, _ = SUPIR_model.conditioner.get_unconditional_conditioning(cond, None)
    
                    c.append(_c)
                    pbar.update(1)
            else: #batch captioning
                print("Batch captioning")
                c = []
                uc = []
                for i, sample in enumerate(samples):
                    
                    cond = {}
                    cond['original_size_as_tuple'] = torch.tensor([[1024, 1024]]).to(device)
                    cond['crop_coords_top_left'] = torch.tensor([[0, 0]]).to(device)
                    cond['target_size_as_tuple'] = torch.tensor([[1024, 1024]]).to(device)
                    cond['aesthetic_score'] = torch.tensor([[9.0]]).to(device)
                    cond['control'] = sample.unsqueeze(0)

                    uncond = copy.deepcopy(cond)
                    uncond['txt'] = [negative_prompt]
                    cond['txt'] = [''.join([captions_list[i][0], positive_prompt])]
                    _c, _uc = SUPIR_model.conditioner.get_unconditional_conditioning(cond, uncond)    
                    c.append(_c)
                    uc.append(_uc)
                    
                    pbar.update(1)

            
        SUPIR_model.conditioner.to('cpu')
                
        return ({"cond": c, "original_size":latents["original_size"]}, {"uncond": uc},)

```
