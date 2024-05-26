# Documentation
- Class name: KfApplyCurveToCond
- Category: CONDITIONING
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点根据指定的曲线动态调整条件数据的强度，允许在生成过程中对条件变量的影响进行细微控制。

# Input types
## Required
- curve
    - 曲线输入是一系列值，将用于调节条件数据，代表随时间或其他变量对条件强度进行的期望调整。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: List[float]
- cond
    - 将由曲线输入调整的条件数据，通常包括张量及其关联的元数据，为生成过程提供上下文。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict]]
## Optional
- latents
    - 可选的潜在数据，可用于进一步细化曲线应用于条件数据，增强节点对不同用例的适应性。
    - Comfy dtype: LATENT
    - Python dtype: Dict
- start_t
    - 要应用的曲线的起始索引，可用于控制影响条件数据的曲线片段。
    - Comfy dtype: INT
    - Python dtype: int
- n
    - 要生成的样本数量，如果提供潜在数据，则可以从中推断，它决定了应用于条件数据的曲线片段的长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- cond_out
    - 输出是修改后的条件数据，其强度已根据输入曲线进行了调整，从而在生成过程中提供了更定制化的影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict]]

# Usage tips
- Infra type: CPU

# Source code
```
class KfApplyCurveToCond:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('CONDITIONING',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('KEYFRAMED_CURVE', {'forceInput': True}), 'cond': ('CONDITIONING', {'forceInput': True})}, 'optional': {'latents': ('LATENT', {}), 'start_t': ('INT', {'default': 0}), 'n': ('INT', {})}}

    def main(self, curve, cond, latents=None, start_t=0, n=0):
        curve = deepcopy(curve)
        cond = deepcopy(cond)
        if isinstance(latents, dict):
            if 'samples' in latents:
                n = latents['samples'].shape[0]
        cond_out = []
        for (c_tensor, c_dict) in cond:
            m = c_tensor.shape[0]
            if c_tensor.shape[0] == 1:
                c_tensor = c_tensor.repeat(n, 1, 1)
                m = n
            weights = [curve[start_t + i] for i in range(m)]
            weights = torch.tensor(weights, device=c_tensor.device)
            c_tensor = c_tensor * weights.view(m, 1, 1)
            if 'pooled_output' in c_dict:
                c_dict = deepcopy(c_dict)
                pooled = c_dict['pooled_output']
                if pooled.shape[0] == 1:
                    pooled = pooled.repeat(m, 1)
                c_dict['pooled_output'] = pooled * weights.view(m, 1)
            cond_out.append((c_tensor, c_dict))
        return (cond_out,)
```