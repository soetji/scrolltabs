class ScrollTabs extends React.Component {
    constructor (props) {
        super(props);

        this.handleResizeThis = this.handleResize.bind(this);

        this.state = {
            selectedIndex: this.props.selectedIndex,
            width: undefined
        }
    }

    init () {
        this.moreWidth = $(this.headMoreEl).outerWidth();
        this.handleResize();
        $(window).on('resize', this.handleResizeThis);
    }

    handleResize () {
        this.setState({width: $(this.container).width()});
    }

    handleTabClick (ev) {
        this.setState({selectedIndex: Number(ev.target.dataset.tabIndex)});
    }

    componentDidMount () {
        this.init();
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
                className='scroll-tab-more'
                data-tab-index={i + indexOffset}
                onClick={this.handleTabClick.bind(this)}
            >{tab}</div>
        );
    }

    divideTabs (allTabs, containerWidth, minWidth, selectedIndex) {
        let headMore, tailMore, tabTotal, tabWidth,
            headIndex, tabTotalDiff;

        for (tabTotal = allTabs.length; tabTotal > 0; tabTotal--) {
            tabWidth = (containerWidth - 2 * this.moreWidth) / tabTotal;
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

            console.log(tabs);

            if (tabs.headMore.length) {
                headMore = (
                    <div className='scroll-tabs-more head'>
                        {this.renderMore(tabs.headMore, 0)}
                    </div>
                );
            }

            if (tabs.tailMore.length) {
                tailMore = (
                    <div className='scroll-tabs-more tail'>
                        {this.renderMore(tabs.tailMore, this.headIndex + tabs.main.length)}
                    </div>
                );
            }

            main = this.renderTabs(tabs.main, tabs.tabWidth, this.state.selectedIndex);
        }

        return (
            <div ref={el => this.container = el}>
                <div className='scroll-tabs' style={{width: this.state.width}}>
                    <div ref={el => this.headMoreEl = el}
                        className={classNames('scroll-tabs-more-link head', {
                            more: tabs && tabs.headMore.length
                        })}
                    >{headMore}</div>
                    {main}
                    <div className={classNames('scroll-tabs-more-link tail', {
                        more: tabs && tabs.tailMore.length
                    })}
                    >{tailMore}</div>
                </div>
            </div>
        );
    }
}

window.ScrollTabs = ScrollTabs;
