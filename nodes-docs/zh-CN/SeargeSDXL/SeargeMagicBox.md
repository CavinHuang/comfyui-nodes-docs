# Documentation
- Class name: SeargeMagicBox
- Category: UI.CATEGORY_MAGIC
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点作为图像生成过程的中心协调器，根据用户输入和系统设置管理数据流和各个阶段的执行。它旨在处理涉及预处理、模型加载、条件设置、采样和后处理的复杂工作流，以产生高质量的图像，同时允许对生成过程进行广泛的定制和控制。

# Input types
## Required
- stage
    - 阶段参数决定节点内要执行的特定操作。它是节点提供的各种功能的选择器，例如加载检查点、应用控制网或生成图像。阶段的选择直接影响输出和图像生成流水线中的后续步骤。
    - Comfy dtype: COMBO[STAGES]
    - Python dtype: str
- input_from
    - 该参数确定节点输入数据的来源。它可以是预定义的数据流或用户自定义输入。输入数据非常重要，因为它构成了所有后续处理的基础，并直接影响节点的最终输出。
    - Comfy dtype: COMBO[INPUT_OUTPUT]
    - Python dtype: str
- output_to
    - output_to参数指定节点输出应该指向的位置。它可以设置为自定义输出或进一步处理的数据流。这个参数在确定整个系统内部数据流方面至关重要，并影响节点操作结果的使用方式。
    - Comfy dtype: COMBO[INPUT_OUTPUT]
    - Python dtype: str
## Optional
- data
    - data参数是一个包含所有必要的信息和中间结果的字典，这些信息和结果在流水线的不同阶段之间传递。它作为数据流的支柱，确保所有阶段都能访问到处理所需的数据。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- custom_input
    - 当节点提供自定义输入时，使用此参数。它允许注入外部数据或特定配置，这些不是标准数据流的一部分。custom_input参数提供了图像生成过程中的灵活性和适应性。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Output types
- data
    - 节点的data输出包含图像生成过程的结果，包括任何处理过的图像、潜在表示和其他相关信息。这些数据用作流水线后续阶段的输入或可以保存为最终输出。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]
- custom_output
    - 当input_from参数设置为自定义时，使用custom_output参数。它允许定制节点的输出以满足特定的用户需求或集成到更广泛的系统中。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeMagicBox:
    NONE = 'none - skip'
    PRE_PROCESS_DATA = 'pre-process data'
    LOAD_CHECKPOINTS = 'load checkpoints'
    APPLY_LORAS = 'apply loras'
    PROMPT_STYLING = 'prompt styling'
    CLIP_CONDITIONING = 'clip conditioning'
    CLIP_MIXING = 'clip mixing'
    APPLY_CONTROLNET = 'apply controlnet'
    LATENT_INPUTS = 'latent inputs'
    SAMPLING = 'sampling'
    LATENT_DETAILER = 'latent detailer'
    VAE_DECODE_SAMPLED = 'vae decode sampled'
    HIGH_RESOLUTION = 'high resolution'
    HIRES_DETAILER = 'hires detailer'
    VAE_DECODE_HI_RES = 'vae decode hi-res'
    UPSCALING = 'upscaling'
    IMAGE_SAVING = 'image saving'
    STAGES = [NONE, PRE_PROCESS_DATA, LOAD_CHECKPOINTS, APPLY_LORAS, PROMPT_STYLING, CLIP_CONDITIONING, CLIP_MIXING, APPLY_CONTROLNET, LATENT_INPUTS, SAMPLING, LATENT_DETAILER, VAE_DECODE_SAMPLED, HIGH_RESOLUTION, HIRES_DETAILER, VAE_DECODE_HI_RES, UPSCALING, IMAGE_SAVING]
    DATA = 'data stream'
    CUSTOM_AND_DATA = 'custom stage & data stream'
    INPUT_OUTPUT = [DATA, CUSTOM_AND_DATA]

    def __init__(self):
        self.stage_pre_process_data = None
        self.stage_load_checkpoints = None
        self.stage_apply_loras = None
        self.stage_prompt_styling = None
        self.stage_clip_conditioning = None
        self.stage_clip_mixing = None
        self.stage_latent_inputs = None
        self.stage_apply_controlnet = None
        self.stage_sampling = None
        self.stage_vae_decode_sampled = None
        self.stage_latent_detailer = None
        self.stage_high_resolution = None
        self.stage_hires_detailer = None
        self.stage_vae_decode_hi_res = None
        self.stage_upscaling = None
        self.stage_image_saving = None
        self.stage_ = None

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'stage': (s.STAGES, {'default': s.NONE}), 'input_from': (s.INPUT_OUTPUT,), 'output_to': (s.INPUT_OUTPUT,)}, 'optional': {'data': ('SRG_DATA_STREAM',), 'custom_input': ('SRG_STAGE_INPUT',)}}
    RETURN_TYPES = ('SRG_DATA_STREAM', 'SRG_STAGE_OUTPUT')
    RETURN_NAMES = ('data', 'custom_output')
    FUNCTION = 'process'
    CATEGORY = UI.CATEGORY_MAGIC

    def run_stage(self, stage, data, stage_input=None):
        stage_processor = None
        has_data = data is not None
        stage_output = stage_input
        if has_data:
            data['stage_output'] = None
        if stage == self.NONE:
            pass
        elif stage == self.PRE_PROCESS_DATA:
            if self.stage_pre_process_data is None:
                self.stage_pre_process_data = SeargePreProcessData()
            stage_processor = self.stage_pre_process_data
        elif stage == self.LOAD_CHECKPOINTS:
            if self.stage_load_checkpoints is None:
                self.stage_load_checkpoints = SeargeStageLoadCheckpoints()
            stage_processor = self.stage_load_checkpoints
        elif stage == self.APPLY_LORAS:
            if self.stage_apply_loras is None:
                self.stage_apply_loras = SeargeStageApplyLoras()
            stage_processor = self.stage_apply_loras
        elif stage == self.PROMPT_STYLING:
            if self.stage_prompt_styling is None:
                self.stage_prompt_styling = SeargeStage()
            stage_processor = self.stage_prompt_styling
        elif stage == self.CLIP_CONDITIONING:
            if self.stage_clip_conditioning is None:
                self.stage_clip_conditioning = SeargeStageClipConditioning()
            stage_processor = self.stage_clip_conditioning
        elif stage == self.CLIP_MIXING:
            if self.stage_clip_mixing is None:
                self.stage_clip_mixing = SeargeStage()
            stage_processor = self.stage_clip_mixing
        elif stage == self.APPLY_CONTROLNET:
            if self.stage_apply_controlnet is None:
                self.stage_apply_controlnet = SeargeStageApplyControlnet()
            stage_processor = self.stage_apply_controlnet
        elif stage == self.LATENT_INPUTS:
            if self.stage_latent_inputs is None:
                self.stage_latent_inputs = SeargeStageLatentInputs()
            stage_processor = self.stage_latent_inputs
        elif stage == self.SAMPLING:
            if self.stage_sampling is None:
                self.stage_sampling = SeargeStageSampling()
            stage_processor = self.stage_sampling
        elif stage == self.LATENT_DETAILER:
            if self.stage_latent_detailer is None:
                self.stage_latent_detailer = SeargeStageLatentDetailer()
            stage_processor = self.stage_latent_detailer
        elif stage == self.VAE_DECODE_SAMPLED:
            if self.stage_vae_decode_sampled is None:
                self.stage_vae_decode_sampled = SeargeStageVAEDecodeSampled()
            stage_processor = self.stage_vae_decode_sampled
        elif stage == self.HIGH_RESOLUTION:
            if self.stage_high_resolution is None:
                self.stage_high_resolution = SeargeStageHighResolution()
            stage_processor = self.stage_high_resolution
        elif stage == self.HIRES_DETAILER:
            if self.stage_hires_detailer is None:
                self.stage_hires_detailer = SeargeStageHiresDetailer()
            stage_processor = self.stage_hires_detailer
        elif stage == self.VAE_DECODE_HI_RES:
            if self.stage_vae_decode_hi_res is None:
                self.stage_vae_decode_hi_res = SeargeStageVAEDecodeHires()
            stage_processor = self.stage_vae_decode_hi_res
        elif stage == self.UPSCALING:
            if self.stage_upscaling is None:
                self.stage_upscaling = SeargeStageUpscaling()
            stage_processor = self.stage_upscaling
        elif stage == self.IMAGE_SAVING:
            if self.stage_image_saving is None:
                self.stage_image_saving = SeargeStageImageSaving()
            stage_processor = self.stage_image_saving
        else:
            print('WARNING: implementation for stage ' + stage + ' is missing!')
        if stage_processor is None:
            return (data, None)
        stage_input = stage_processor.get_input(data, stage_output)
        stage_result = None
        if stage_input is not None:
            (data, stage_result) = stage_processor.process(data, stage_input)
        if has_data:
            data['stage_output'] = stage_result
        return (data, stage_result)

    def process(self, stage, input_from, output_to, data=None, custom_input=None):
        if data is None:
            data = {}
        stage_input = None
        custom_output = None
        if input_from == self.CUSTOM_AND_DATA:
            stage_input = custom_input
        if PipelineAccess(data).is_pipeline_enabled():
            (data, stage_result) = self.run_stage(stage, data, stage_input)
        else:
            stage_result = None
        if output_to == self.CUSTOM_AND_DATA:
            custom_output = stage_result
        return (data, custom_output)
```