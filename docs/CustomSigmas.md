
# Documentation
- Class name: CustomSigmas
- Category: KJNodes/noise
- Output node: False

CustomSigmas节点旨在将浮点数列表转换为sigma张量，从而便于在神经网络模型的噪声相关操作中操作和应用这些值。

# Input types
## Required
- sigmas_string
    - 该参数表示一串逗号分隔的sigma值，用于转换成sigma张量。它对于定义后续操作中要使用的具体sigma值至关重要，直接影响噪声应用的行为和结果。
    - Comfy dtype: STRING
    - Python dtype: str
- interpolate_to_steps
    - 指定sigma值应该插值到的步数。这个参数对于调整sigma张量的长度以匹配模型处理中所需的步数非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SIGMAS
    - 输出是从输入的浮点数列表派生的sigma张量。这个张量对于神经网络模型中的噪声操作和应用过程至关重要。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CustomSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {
                     "sigmas_string" :("STRING", {"default": "14.615, 6.475, 3.861, 2.697, 1.886, 1.396, 0.963, 0.652, 0.399, 0.152, 0.029","multiline": True}),
                     "interpolate_to_steps": ("INT", {"default": 10,"min": 0, "max": 255, "step": 1}),
                     }
                }
    RETURN_TYPES = ("SIGMAS",)
    RETURN_NAMES = ("SIGMAS",)
    CATEGORY = "KJNodes/noise"
    FUNCTION = "customsigmas"
    DESCRIPTION = """
Creates a sigmas tensor from a string of comma separated values.  
Examples: 
   
Nvidia's optimized AYS 10 step schedule for SD 1.5:  
14.615, 6.475, 3.861, 2.697, 1.886, 1.396, 0.963, 0.652, 0.399, 0.152, 0.029  
SDXL:   
14.615, 6.315, 3.771, 2.181, 1.342, 0.862, 0.555, 0.380, 0.234, 0.113, 0.029  
SVD:  
700.00, 54.5, 15.886, 7.977, 4.248, 1.789, 0.981, 0.403, 0.173, 0.034, 0.002  
"""
    def customsigmas(self, sigmas_string, interpolate_to_steps):
        sigmas_list = sigmas_string.split(', ')
        sigmas_float_list = [float(sigma) for sigma in sigmas_list]
        sigmas_tensor = torch.tensor(sigmas_float_list)
        if len(sigmas_tensor) != interpolate_to_steps:
            sigmas_tensor = self.loglinear_interp(sigmas_tensor, interpolate_to_steps)
        return (sigmas_tensor,)
     
    def loglinear_interp(self, t_steps, num_steps):
        """
        Performs log-linear interpolation of a given array of decreasing numbers.
        """
        t_steps_np = t_steps.numpy()

        xs = np.linspace(0, 1, len(t_steps_np))
        ys = np.log(t_steps_np[::-1])
        
        new_xs = np.linspace(0, 1, num_steps)
        new_ys = np.interp(new_xs, xs, ys)
        
        interped_ys = np.exp(new_ys)[::-1].copy()
        interped_ys_tensor = torch.tensor(interped_ys)
        return interped_ys_tensor

```
