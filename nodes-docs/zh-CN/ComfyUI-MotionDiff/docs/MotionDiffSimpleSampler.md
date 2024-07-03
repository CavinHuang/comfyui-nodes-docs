
# Documentation
- Class name: MotionDiffSimpleSampler
- Category: MotionDiff
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MotionDiffSimpleSampler节点旨在简化运动扩散框架中的采样过程，特别针对运动数据的生成或转换。它抽象了选择和应用不同采样策略（如均匀采样或损失感知采样）的复杂性，以根据给定条件和输入生成或修改运动序列。

# Input types
## Required
- sampler_name
    - 指定要使用的采样策略的名称，影响生成或转换运动数据的算法选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- md_model
    - 运动扩散模型的封装器，为采样过程提供必要的接口。
    - Comfy dtype: MD_MODEL
    - Python dtype: MotionDiffModelWrapper
- md_clip
    - 表示运动生成或转换所需的剪辑信息，封装了模型及其相关数据。
    - Comfy dtype: MD_CLIP
    - Python dtype: MotionDiffCLIPWrapper
- md_cond
    - 运动数据生成或转换的条件，指导采样过程。这包括由MotionCLIPTextEncode节点处理的文本和运动数据。
    - Comfy dtype: MD_CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- motion_data
    - 将被转换或重新生成的输入运动数据，具体取决于采样策略。包括运动、运动掩码和运动长度。
    - Comfy dtype: MOTION_DATA
    - Python dtype: Dict[str, torch.Tensor]
- seed
    - 确保生成或转换的运动数据可重现性的种子值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- motion_data
    - 采样后的输出运动数据，包括生成或转换后的运动序列、运动掩码和运动长度。
    - Comfy dtype: MOTION_DATA
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MotionDiffSimpleSampler:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "sampler_name": (["ddpm", "ddim"], {"default": "ddim"}),
                "md_model": ("MD_MODEL", ),
                "md_clip": ("MD_CLIP", ),
                "md_cond": ("MD_CONDITIONING", ),
                "motion_data": ("MOTION_DATA",),
                "seed": ("INT", {"default": 123,"min": 0, "max": 0xffffffffffffffff, "step": 1}),
            }
        }

    RETURN_TYPES = ("MOTION_DATA",)
    CATEGORY = "MotionDiff"
    FUNCTION = "sample"

    def sample(self, sampler_name, md_model: MotionDiffModelWrapper, md_clip, md_cond, motion_data, seed):
        md_model.to(get_torch_device())
        md_clip.to(get_torch_device())
        for key in motion_data:
            motion_data[key] = to_gpu(motion_data[key])

        kwargs = {
            **motion_data,
            'inference_kwargs': {},
            'sampler': sampler_name,
            'seed': seed
        }

        with torch.no_grad():
            output = md_model(md_clip.model, cond_dict=md_cond, **kwargs)[0]['pred_motion']
            pred_motion = output * md_model.dataset.std + md_model.dataset.mean
            pred_motion = pred_motion.cpu().detach()
        
        md_model.cpu(), md_clip.cpu()
        for key in motion_data:
            motion_data[key] = to_cpu(motion_data[key])
        return ({
            'motion': pred_motion,
            'motion_mask': motion_data['motion_mask'],
            'motion_length': motion_data['motion_length'],
        }, )

```
