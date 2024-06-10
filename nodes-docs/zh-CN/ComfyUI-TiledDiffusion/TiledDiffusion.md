# Documentation
- Class name: TiledDiffusion
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/shiimizu/ComfyUI-TiledDiffusion

TiledDiffusion类作为一个框架，用于以平铺的方式应用扩散模型，通过将大图像分割成较小的片段来增强处理，这种方法提高了计算效率并允许对扩散过程进行更细粒度的控制。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了节点内部要使用的扩散模型。它是控制TiledDiffusion过程行为和输出的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_patcher.ModelPatcher
- method
    - 方法参数决定了要使用的具体扩散技术，影响输出的整体性能和质量。它是调整节点功能以适应期望结果的关键因素。
    - Comfy dtype: COMBO[('MultiDiffusion', 'Mixture of Diffusers')]
    - Python dtype: str
- tile_width
    - tile_width参数决定了平铺过程中每个瓦片的宽度，直接影响扩散应用的粒度。它对于优化处理时间和结果细节之间的平衡至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - tile_height参数设置了每个瓦片的高度，与tile_width一起决定了平铺策略。这个参数对于管理计算负载和确保扩散过程的效率至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- tile_overlap
    - tile_overlap参数定义了相邻瓦片之间的重叠，确保整个图像上扩散效果的无缝集成。它在维持最终输出的连贯性和质量方面起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- tile_batch_size
    - tile_batch_size参数指定了每批处理的瓦片数量，这对于管理内存使用和加速扩散过程至关重要。它直接影响计算资源和处理速度之间的权衡。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 输出模型是输入模型的修改版本，现在配备了平铺扩散功能。它代表了节点处理的成果，封装了通过扩散方法处理大图像的增强能力。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_patcher.ModelPatcher

# Usage tips
- Infra type: GPU

# Source code
```
class TiledDiffusion:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'method': (['MultiDiffusion', 'Mixture of Diffusers'], {'default': 'Mixture of Diffusers'}), 'tile_width': ('INT', {'default': 96 * opt_f, 'min': 16, 'max': MAX_RESOLUTION, 'step': 16}), 'tile_height': ('INT', {'default': 96 * opt_f, 'min': 16, 'max': MAX_RESOLUTION, 'step': 16}), 'tile_overlap': ('INT', {'default': 8 * opt_f, 'min': 0, 'max': 256 * opt_f, 'step': 4 * opt_f}), 'tile_batch_size': ('INT', {'default': 4, 'min': 1, 'max': MAX_RESOLUTION, 'step': 1})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply'
    CATEGORY = '_for_testing'

    def apply(self, model: ModelPatcher, method, tile_width, tile_height, tile_overlap, tile_batch_size):
        if method == 'Mixture of Diffusers':
            implement = MixtureOfDiffusers()
        else:
            implement = MultiDiffusion()
        implement.tile_width = tile_width // opt_f
        implement.tile_height = tile_height // opt_f
        implement.tile_overlap = tile_overlap // opt_f
        implement.tile_batch_size = tile_batch_size
        model = model.clone()
        model.set_model_unet_function_wrapper(implement)
        model.model_options['tiled_diffusion'] = True
        return (model,)
```