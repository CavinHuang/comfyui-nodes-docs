# Documentation
- Class name: MotionctrlLoader
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl.git

MotionctrlLoader 类旨在高效管理和加载运动控制检查点，用于高级运动分析和生成任务。它抽象了加载和初始化运动控制模型的复杂性，为用户提供了一个简化的接口，以便利用运动控制功能。

# Input types
## Required
- ckpt_name
    - 检查点名称是一个关键参数，它指定要加载的模型检查点。这对于确定正确的预训练模型权重和架构至关重要。
    - Comfy dtype: str
    - Python dtype: str
- frame_length
    - 帧长参数决定了运动控制模型的时间范围。它对于调整模型以处理不同持续时间的运动序列非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 模型输出代表已加载的运动控制模型，可用于推理或进一步处理。它封装了运动序列生成或分析所必需的运动的模式和动态。
    - Comfy dtype: MOTIONCTRL
    - Python dtype: torch.nn.Module
- clip
    - clip 输出是运动控制模型的嵌入器组件，负责从运动序列中提取特征。它在模型理解和处理运动数据的能力中起着至关重要的作用。
    - Comfy dtype: EMBEDDER
    - Python dtype: torch.nn.Module
- vae
    - vae 输出指的是运动控制模型中的变分自编码器部分，它在将运动数据编码和解码到较低维度的潜在空间中起着重要作用。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- ddim_sampler
    - ddim_sampler 输出是基于已加载的运动控制模型生成新运动序列的采样机制。它提供了一种创建多样化和现实运动输出的方法。
    - Comfy dtype: SAMPLER
    - Python dtype: DDIMSampler

# Usage tips
- Infra type: GPU

# Source code
```
class MotionctrlLoader:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'ckpt_name': (['motionctrl.pth'], {'default': 'motionctrl.pth'}), 'frame_length': ('INT', {'default': 16})}}
    RETURN_TYPES = ('MOTIONCTRL', 'EMBEDDER', 'VAE', 'SAMPLER')
    RETURN_NAMES = ('model', 'clip', 'vae', 'ddim_sampler')
    FUNCTION = 'load_checkpoint'
    CATEGORY = 'motionctrl'

    def load_checkpoint(self, ckpt_name, frame_length):
        gpu_num = 1
        gpu_no = 0
        ckpt_path = folder_paths.get_full_path('checkpoints', ckpt_name)
        comfy_path = os.path.dirname(folder_paths.__file__)
        config_path = os.path.join(comfy_path, 'custom_nodes/ComfyUI-MotionCtrl/configs/inference/config_both.yaml')
        args = {'ckpt_path': f'{ckpt_path}', 'adapter_ckpt': None, 'base': f'{config_path}', 'condtype': 'both', 'prompt_dir': None, 'n_samples': 1, 'ddim_steps': 50, 'ddim_eta': 1.0, 'bs': 1, 'height': 256, 'width': 256, 'unconditional_guidance_scale': 1.0, 'unconditional_guidance_scale_temporal': None, 'seed': 1234, 'cond_T': 800}
        config = OmegaConf.load(args['base'])
        OmegaConf.update(config, 'model.params.unet_config.params.temporal_length', frame_length)
        model_config = config.pop('model', OmegaConf.create())
        model = instantiate_from_config(model_config)
        model = model.cuda(gpu_no)
        assert os.path.exists(args['ckpt_path']), f"Error: checkpoint {args['ckpt_path']} Not Found!"
        print(f"Loading checkpoint from {args['ckpt_path']}")
        model = load_model_checkpoint(model, args['ckpt_path'], args['adapter_ckpt'])
        model.eval()
        ddim_sampler = DDIMSampler(model)
        return (model, model.cond_stage_model, model.first_stage_model, ddim_sampler)
```