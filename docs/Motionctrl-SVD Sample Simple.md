# Documentation
- Class name: MotionctrlSVDSampleSimple
- Category: motionctrl
- Output node: False
- Repo Ref: https://github.com/chaojie/ComfyUI-MotionCtrl-SVD.git

MotionctrlSVDSampleSimple节点旨在处理并从输入图像和相机数据生成运动序列。它利用模型的推理能力来创建代表运动的一系列帧，增强动态场景的视觉表现。该节点抽象了运动生成的复杂性，为用户提供了一个高层次的接口来探索和可视化运动动态。

# Input types
## Required
- model
    - 模型参数对于节点的运行至关重要，因为它定义了用于生成运动序列的基础运动控制机制。没有指定的模型，节点无法执行其创建动态视觉内容的预期功能。
    - Comfy dtype: MOTIONCTRLSVD
    - Python dtype: torch.nn.Module
- camera
    - 相机参数是必不可少的，因为它提供了用于模拟生成的运动序列中相机的视角和方向的相机姿态数据。这些数据影响了运动表示的真实性和准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - 图像参数是节点的关键输入，作为生成运动序列的视觉上下文。它设置了场景并为模型提供了必要的视觉线索，以便创建一个连贯且与上下文相关的运动序列。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- resize_mode
    - 调整模式参数很重要，因为它决定了输入图像如何调整大小以适应模型的要求。这种调整确保图像适合处理，这对于准确生成运动序列至关重要。
    - Comfy dtype: RESIZE_MODE
    - Python dtype: str
- seed
    - 种子参数对节点至关重要，因为它确保了运动序列生成过程的可重复性。通过设置种子，用户可以在不同的运行中获得一致的结果，这对于测试和调试目的至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- fps_id
    - fps_id参数很重要，因为它决定了生成的运动序列的每秒帧数。这直接影响到生成的运动序列的平滑度和流畅性，对最终视频的观感有重要影响。
    - Comfy dtype: INT
    - Python dtype: int
- frame_length
    - frame_length参数定义了要在运动序列中生成的帧数。它是决定节点将产生运动的持续时间和范围的关键因素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出参数代表生成的运动序列，这是一系列描绘从输入数据推断出的运动的图像。这个输出很重要，因为它是节点功能的直接结果，提供了运动动态的视觉表示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class MotionctrlSVDSampleSimple:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MOTIONCTRLSVD',), 'camera': ('STRING', {'multiline': True, 'default': '[[1,0,0,0,0,1,0,0,0,0,1,0.2]]'}), 'image': ('IMAGE',), 'resize_mode': (RESIZE_MODE,), 'seed': ('INT', {'default': 1234}), 'fps_id': ('INT', {'default': 6, 'min': 5, 'max': 30}), 'frame_length': ('INT', {'default': 14})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run_inference'
    CATEGORY = 'motionctrl'

    def run_inference(self, model, camera, image, resize_mode, seed, fps_id, frame_length):
        global device
        RT = process_camera(camera, frame_length).reshape(-1, 12)
        image = 255.0 * image[0].cpu().numpy()
        image = Image.fromarray(np.clip(image, 0, 255).astype(np.uint8))
        image = process_input_image(image, resize_mode)
        return motionctrl_sample(model=model, image=image, RT=RT, num_frames=frame_length, fps_id=fps_id, decoding_t=1, seed=seed, sample_num=1, device=device)
```