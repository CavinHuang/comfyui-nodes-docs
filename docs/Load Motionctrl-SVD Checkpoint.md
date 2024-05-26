# Documentation
- Class name: MotionctrlSVDLoader
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl-SVD.git

MotionctrlSVDLoader类是初始化和管理Motionctrl-SVD模型的关键组件，专注于高效地加载和准备模型以供执行。它封装了检索检查点和根据指定参数配置模型的过程，确保模型准备好进行运动序列的分析和合成任务。

# Input types
## Required
- ckpt_name
    - ckpt_name参数对于指定Motionctrl-SVD模型的检查点文件名至关重要。它指导加载器使用正确的模型状态，这对于后续的模型操作和结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_length
    - frame_length参数很重要，因为它定义了模型输入数据的时间维度。它影响模型处理和生成给定帧跨度内连贯运动序列的能力。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数对于确定模型在其操作过程中将执行的迭代次数至关重要。它直接影响计算效率和生成的运动序列的质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 输出模型代表加载和配置好的Motionctrl-SVD，准备用于运动序列分析和合成。它是输入参数和加载器功能的结晶，封装了模型用于进一步使用的能力。
    - Comfy dtype: MOTIONCTRLSVD
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class MotionctrlSVDLoader:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'ckpt_name': (['motionctrl_svd.ckpt'], {'default': 'motionctrl_svd.ckpt'}), 'frame_length': ('INT', {'default': 14}), 'steps': ('INT', {'default': 25})}}
    RETURN_TYPES = ('MOTIONCTRLSVD',)
    RETURN_NAMES = ('model',)
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'motionctrl'

    def load_checkpoint(self, ckpt_name, frame_length, steps):
        global device
        comfy_path = os.path.dirname(folder_paths.__file__)
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        config_path = os.path.join(comfy_path, 'custom_nodes/ComfyUI-MotionCtrl-SVD/configs/inference/config_motionctrl_cmcm.yaml')
        if not os.path.exists(ckpt_path):
            os.system(f'wget https://huggingface.co/TencentARC/MotionCtrl/resolve/main/motionctrl_svd.ckpt?download=true -P .')
            os.system(f'mv motionctrl_svd.ckpt?download=true {ckpt_path}')
        model = build_model(config_path, ckpt_path, device, frame_length, steps)
        return (model,)
```