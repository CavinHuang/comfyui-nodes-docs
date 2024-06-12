# Documentation
- Class name: CreateMagicMask
- Category: KJNodes/masking/generate
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

CreateMagicMask 节点旨在生成一对具有不同复杂度和细节的遮罩。它利用程序化生成的原理，创造出视觉上引人入胜的图案，可以用于从视觉效果到艺术作品的广泛应用。该节点通过使用一组参数来操作，这些参数定义了生成遮罩的特征，例如帧数、过渡、深度、扭曲、种子和帧尺寸。结果是动态的、可定制的遮罩，可以反转以产生多种效果。

# Input types
## Required
- frames
    - ‘frames’参数决定了为遮罩序列生成的总帧数。它是定义动画长度和复杂度的关键因素。帧数越多，过渡越平滑，图案越复杂，但这也增加了计算负载。
    - Comfy dtype: INT
    - Python dtype: int
- transitions
    - ‘transitions’参数指定了遮罩序列内的过渡次数。每次过渡都会引入图案的变化，有助于整体视觉动态。它影响遮罩外观随时间演变的多样性和速度。
    - Comfy dtype: INT
    - Python dtype: int
- depth
    - ‘depth’参数通过指定应用于基础坐标的变换次数来控制生成遮罩的细节水平。更大的深度值增强了图案的复杂性，创造出更多嵌套和复杂的结构。
    - Comfy dtype: INT
    - Python dtype: int
- distortion
    - ‘distortion’参数影响遮罩图案的不规则程度。它为生成的形状和形式引入了可变性，允许广泛的视觉效果。更高的扭曲值可以导致更抽象和不可预测的图案。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - ‘seed’参数用于初始化随机数生成器，确保遮罩生成过程的可重复性。当使用相同设置重新运行节点时，获得一致结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- frame_width
    - ‘frame_width’参数定义了遮罩序列中每个帧的宽度。它在确定视觉输出的分辨率和规模方面起着重要作用。更大的帧宽度可以容纳更多细节，但可能需要更多的内存和处理能力。
    - Comfy dtype: INT
    - Python dtype: int
- frame_height
    - ‘frame_height’参数设置了遮罩序列中每个帧的高度，与frame_width相辅相成，建立视觉画布的整体尺寸。它是展示和框架生成内容的关键因素。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 'mask' 输出提供了作为帧堆叠的生成遮罩序列，每一帧代表遮罩演变的一个阶段。它是进一步处理或在视觉应用中直接使用的关键组成部分。
    - Comfy dtype: TORCH_TENSOR
    - Python dtype: torch.Tensor
- mask_inverted
    - 'mask_inverted' 输出展示了生成遮罩序列的反转，提供了一种可以用于创建对比或突出内容不同方面的替代视觉效果。
    - Comfy dtype: TORCH_TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateMagicMask:
    RETURN_TYPES = ('MASK', 'MASK')
    RETURN_NAMES = ('mask', 'mask_inverted')
    FUNCTION = 'createmagicmask'
    CATEGORY = 'KJNodes/masking/generate'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'frames': ('INT', {'default': 16, 'min': 2, 'max': 4096, 'step': 1}), 'depth': ('INT', {'default': 12, 'min': 1, 'max': 500, 'step': 1}), 'distortion': ('FLOAT', {'default': 1.5, 'min': 0.0, 'max': 100.0, 'step': 0.01}), 'seed': ('INT', {'default': 123, 'min': 0, 'max': 99999999, 'step': 1}), 'transitions': ('INT', {'default': 1, 'min': 1, 'max': 20, 'step': 1}), 'frame_width': ('INT', {'default': 512, 'min': 16, 'max': 4096, 'step': 1}), 'frame_height': ('INT', {'default': 512, 'min': 16, 'max': 4096, 'step': 1})}}

    def createmagicmask(self, frames, transitions, depth, distortion, seed, frame_width, frame_height):
        from .magictex import coordinate_grid, random_transform, magic
        rng = np.random.default_rng(seed)
        out = []
        coords = coordinate_grid((frame_width, frame_height))
        frames_per_transition = frames // transitions
        base_params = {'coords': random_transform(coords, rng), 'depth': depth, 'distortion': distortion}
        for t in range(transitions):
            params1 = base_params.copy()
            params2 = base_params.copy()
            params1['coords'] = random_transform(coords, rng)
            params2['coords'] = random_transform(coords, rng)
            for i in range(frames_per_transition):
                alpha = i / frames_per_transition
                params = params1.copy()
                params['coords'] = (1 - alpha) * params1['coords'] + alpha * params2['coords']
                tex = magic(**params)
                dpi = frame_width / 10
                fig = plt.figure(figsize=(10, 10), dpi=dpi)
                ax = fig.add_subplot(111)
                plt.subplots_adjust(left=0, right=1, bottom=0, top=1)
                ax.get_yaxis().set_ticks([])
                ax.get_xaxis().set_ticks([])
                ax.imshow(tex, aspect='auto')
                fig.canvas.draw()
                img = np.array(fig.canvas.renderer._renderer)
                plt.close(fig)
                pil_img = Image.fromarray(img).convert('L')
                mask = torch.tensor(np.array(pil_img)) / 255.0
                out.append(mask)
        return (torch.stack(out, dim=0), 1.0 - torch.stack(out, dim=0))
```