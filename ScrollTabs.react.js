class ScrollTabs extends React.Component {
    constructor (props) {
        super(props);

        this.handleResizeThis = this.handleResize.bind(this);

        this.state = {
            selectedIndex: this.props.selectedIndex,
            width: undefined
        }
    }

    handleResize () {
        this.setState({width: $(this.container).width()});
    }

    handleTabClick (ev) {
        this.setState({selectedIndex: Number(ev.target.dataset.tabIndex)});
    }

    componentDidMount () {
        this.handleResize();
        $(window).on('resize', this.handleResizeThis);
    }

    componentWillUnmount () {
        $(window).off('resize', this.handleResizeThis);
    }

    renderTabs (tabs, tabWidth, selectedIndex) {
        return tabs.map((tab, i) =>
            <div key={i}
                className={classNames('scroll-tab', {
                    selected: i + this.headIndex === selectedIndex
                })}
                data-tab-index={i + this.headIndex}
                style={{columnWidth: tabWidth}}
                onClick={this.handleTabClick.bind(this)}
            >{tab}</div>
        );
    }

    renderMore (tabs, indexOffset) {
        return tabs.map((tab, i) =>
            <div key={i}
                data-tab-index={i + indexOffset}
                onClick={this.handleTabClick.bind(this)}
            >{tab}</div>
        );
    }

    divideTabs (allTabs, containerWidth, minWidth, selectedIndex) {
        let headMore, tailMore, tabTotal, tabWidth,
            headIndex, tabTotalDiff;

        for (tabTotal = allTabs.length; tabTotal > 0; tabTotal--) {
            tabWidth = containerWidth/tabTotal;
            if (tabWidth >= minWidth) {
                break;
            }
        };

        if (this.tabTotal === undefined) {
            this.tabTotal = tabTotal;
            headIndex = selectedIndex - tabTotal + 1;

        // container not resized
        } else if (tabTotal === this.tabTotal){
            if (selectedIndex < this.headIndex) {
                headIndex = selectedIndex;
            } else if (selectedIndex >= this.headIndex + tabTotal) {
                headIndex = selectedIndex - tabTotal + 1;
            } else {
                headIndex = this.headIndex;
            }

        // container resized
        } else {
            tabTotalDiff = tabTotal - this.tabTotal;
            if (tabTotal > 0) {
                headIndex = this.headIndex - tabTotal;
            }
            this.tabTotal = tabTotal;
        }

        if (headIndex < 0) {
            headIndex = 0;
        }
        this.headIndex = headIndex;

        return {
            tabWidth: tabWidth,
            headMore: allTabs.slice(0, this.headIndex),
            tailMore: allTabs.slice(this.headIndex + this.tabTotal),
            main: allTabs.slice(this.headIndex, this.headIndex + this.tabTotal)
        };
    }

    render () {
        let main = '',
            headMore = '',
            tailMore = '',
            tabs;

        if (this.state.width) {
            tabs = this.divideTabs(this.props.tabs, this.state.width,
                this.props.tabMinWidth, this.state.selectedIndex);

            main = (
                <div className='scroll-tabs' style={{width: this.state.width}}>
                    {this.renderTabs(tabs.main, tabs.tabWidth, this.state.selectedIndex)}
                </div>
            );

            if (tabs.headMore) {
                headMore = (
                    <div className='scroll-tabs-head-more'>
                        {this.renderMore(tabs.headMore, 0)}
                    </div>
                );
            }

            if (tabs.tailMore) {
                tailMore = (
                    <div className='scroll-tabs-tail-more'>
                        {this.renderMore(tabs.tailMore, this.headIndex + tabs.main.length)}
                    </div>
                );
            }
        }

        return (
            <div ref={el => this.container = el}>
                {main}
                {headMore}
                {tailMore}
            </div>
        );
    }
}

window.ScrollTabs = ScrollTabs;
