
# Documentation
- Class name: SUPIR_conditioner
- Category: SUPIR
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SUPIR_conditioner节点旨在为SUPIR模型准备输入数据，为后续的处理或生成任务做好准备。它整合了各种调节元素，如正面和负面提示，以使模型的输出更符合特定的预期结果。

# Input types
## Required
- SUPIR_model
    - 代表要应用调节的SUPIR模型，是调节过程的核心组件。
    - Comfy dtype: SUPIRMODEL
    - Python dtype: SUPIRModel
- latents
    - 输入数据的潜在表示，在调节过程中被修改或利用，以影响模型的输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- positive_prompt
    - 一个文本提示，引导模型朝着积极或期望的方向生成或处理数据，影响调节的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 一个文本提示，引导模型避免某些模式或主题，在调节过程中作为正面提示的平衡。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- captions
    - 可选的说明文字，可以为调节过程提供额外的上下文或指导，进一步自定义输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 针对正面结果调节的数据，为SUPIR模型的进一步处理做好准备。
    - Comfy dtype: SUPIR_cond_pos
    - Python dtype: Dict[str, Any]
- negative
    - 针对避免某些模式或主题调节的数据，在生成过程中作为平衡。
    - Comfy dtype: SUPIR_cond_neg
    - Python dtype: Dict[str, Any]


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
