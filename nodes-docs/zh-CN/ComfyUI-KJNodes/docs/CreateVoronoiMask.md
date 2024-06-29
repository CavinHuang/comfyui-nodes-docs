# Documentation
- Class name: CreateVoronoiMask
- Category: KJNodes/masking/generate
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

方法 'createvoronoi' 旨在生成一个Voronoi遮罩，这是一种几何图案，可用于各种图像处理任务。它利用Voronoi图的随机性来创建独特和复杂的图案，这些图案可以根据点的数量、线宽以及起始点和结束点之间的转换速度进行调整。

# Input types
## Required
- frames
    - 参数 'frames' 确定在Voronoi遮罩序列中生成的帧数。它对于定义输出动画或图案的长度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- num_points
    - 参数 'num_points' 指定用于创建Voronoi图的点的数量。它直接影响生成的遮罩的复杂性和细节。
    - Comfy dtype: INT
    - Python dtype: int
- line_width
    - 参数 'line_width' 控制Voronoi遮罩中线的粗细。它是确定图案特征可见性和突出度的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- speed
    - 参数 'speed' 决定点从起始位置过渡到结束位置的速率。它影响遮罩序列中的动态运动。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_width
    - 参数 'frame_width' 设置遮罩序列中每个帧的宽度。它对于定义输出的纵横比和整体尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- frame_height
    - 参数 'frame_height' 确定遮罩序列中每个帧的高度。它与 'frame_width' 一起工作，以确定输出的整体形状。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出参数 'mask' 表示生成的Voronoi遮罩作为张量。这是一个二进制图像，其中遮罩的图案已编码，准备进行进一步处理或应用。
    - Comfy dtype: TORCH.TENSOR
    - Python dtype: torch.Tensor
- mask_inverted
    - 输出参数 'mask_inverted' 提供了生成的Voronoi遮罩的反转版本。这对于在图像处理中创建补充图案或效果非常有用。
    - Comfy dtype: TORCH.TENSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateVoronoiMask:
    RETURN_TYPES = ('MASK', 'MASK')
    RETURN_NAMES = ('mask', 'mask_inverted')
    FUNCTION = 'createvoronoi'
    CATEGORY = 'KJNodes/masking/generate'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'frames': ('INT', {'default': 16, 'min': 2, 'max': 4096, 'step': 1}), 'num_points': ('INT', {'default': 15, 'min': 1, 'max': 4096, 'step': 1}), 'line_width': ('INT', {'default': 4, 'min': 1, 'max': 4096, 'step': 1}), 'speed': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'frame_width': ('INT', {'default': 512, 'min': 16, 'max': 4096, 'step': 1}), 'frame_height': ('INT', {'default': 512, 'min': 16, 'max': 4096, 'step': 1})}}

    def createvoronoi(self, frames, num_points, line_width, speed, frame_width, frame_height):
        from scipy.spatial import Voronoi
        batch_size = frames
        out = []
        aspect_ratio = frame_width / frame_height
        start_points = np.random.rand(num_points, 2)
        start_points[:, 0] *= aspect_ratio
        end_points = np.random.rand(num_points, 2)
        end_points[:, 0] *= aspect_ratio
        for i in range(batch_size):
            t = i * speed / (batch_size - 1)
            t = np.clip(t, 0, 1)
            points = (1 - t) * start_points + t * end_points
            points[:, 0] *= aspect_ratio
            vor = Voronoi(points)
            (fig, ax) = plt.subplots()
            plt.subplots_adjust(left=0, right=1, bottom=0, top=1)
            ax.set_xlim([0, aspect_ratio])
            ax.set_ylim([0, 1])
            ax.axis('off')
            ax.margins(0, 0)
            fig.set_size_inches(aspect_ratio * frame_height / 100, frame_height / 100)
            ax.fill_between([0, 1], [0, 1], color='white')
            for simplex in vor.ridge_vertices:
                simplex = np.asarray(simplex)
                if np.all(simplex >= 0):
                    plt.plot(vor.vertices[simplex, 0], vor.vertices[simplex, 1], 'k-', linewidth=line_width)
            fig.canvas.draw()
            img = np.array(fig.canvas.renderer._renderer)
            plt.close(fig)
            pil_img = Image.fromarray(img).convert('L')
            mask = torch.tensor(np.array(pil_img)) / 255.0
            out.append(mask)
        return (torch.stack(out, dim=0), 1.0 - torch.stack(out, dim=0))
```