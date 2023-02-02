import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
    }

    setLoaders()
    {
        this.loaders = {}
        // this.loaders.gltfLoader = new GLTFLoader()

    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.sourceLoaded(source, [source.path, source.filename]);
            }
            else if(source.type === 'texture')
            {
                this.sourceLoaded(source, source.path + source.filename);
            }
            else if(source.type === 'cubeTexture')
            {
                // TODO::
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}